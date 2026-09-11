import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb, withDbRetry } from "@/lib/db";
import { signSession, sessionCookie } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const username = String(body?.username ?? "").trim();
  const password = String(body?.password ?? "");

  if (!username || !password) {
    return NextResponse.json(
      { message: "Faltan usuario y contraseña." },
      { status: 400 },
    );
  }

  let user;
  try {
    user = await withDbRetry(async () => {
      const sql = await getDb();
      const [row] = await sql`
        SELECT id, username, password_hash, role
        FROM users
        WHERE username = ${username}
      `;
      return row;
    });
  } catch (error) {
    console.error("login:", error.message);
    return NextResponse.json(
      { message: "No se pudo conectar con la base de datos. Intenta de nuevo en unos segundos." },
      { status: 503 },
    );
  }

  if (!user) {
    return NextResponse.json(
      { message: "Usuario o contraseña incorrectos." },
      { status: 401 },
    );
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return NextResponse.json(
      { message: "Usuario o contraseña incorrectos." },
      { status: 401 },
    );
  }

  const token = await signSession({ username: user.username, role: user.role });

  const res = NextResponse.json({ username: user.username, role: user.role });
  res.cookies.set(sessionCookie.name, token, sessionCookie);
  return res;
}