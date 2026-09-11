import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb, withDbRetry } from "@/lib/db";

const USERNAME_PATTERN = /^[\p{L}\p{N} _.'\-]{2,60}$/u;

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const username = String(body?.username ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const password = String(body?.password ?? "");

  if (!USERNAME_PATTERN.test(username)) {
    return NextResponse.json(
      { message: "El usuario debe tener entre 2 y 60 caracteres (letras, números, espacios, _ . - ')." },
      { status: 400 },
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { message: "La contraseña debe tener al menos 6 caracteres." },
      { status: 400 },
    );
  }

  try {
    await withDbRetry(async () => {
      const sql = await getDb();
      const [existing] =
        await sql`SELECT id FROM users WHERE username = ${username}`;
      if (existing) {
        throw Object.assign(new Error("Ese nombre de usuario ya está en uso."), {
          status: 409,
        });
      }

      const password_hash = await bcrypt.hash(password, 10);

      await sql`
        INSERT INTO users (username, email, phone, password_hash, role)
        VALUES (${username}, ${email || null}, ${phone || null}, ${password_hash}, 'user')
      `;
    });
  } catch (error) {
    if (error.status) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("register:", error.message);
    return NextResponse.json(
      { message: "No se pudo conectar con la base de datos. Intenta de nuevo en unos segundos." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, username }, { status: 201 });
}