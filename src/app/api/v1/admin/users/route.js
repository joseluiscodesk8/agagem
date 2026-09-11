import { NextResponse } from "next/server";
import { getDb, withDbRetry } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { message: "No tienes permisos de administrador." },
      { status: 403 },
    );
  }

  try {
    const users = await withDbRetry(async () => {
      const sql = await getDb();
      return await sql`
        SELECT
          u.id,
          u.username,
          u.role,
          u.email,
          u.phone,
          u.created_at,
          COUNT(o.id) FILTER (WHERE o.status <> 'cancelado') AS order_count,
          COALESCE(
            SUM(o.total) FILTER (WHERE o.status <> 'cancelado'),
            0
          ) AS total_spent
        FROM users u
        LEFT JOIN orders o ON o.user_id = u.id
        GROUP BY u.id
        ORDER BY u.created_at DESC
      `;
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("admin users:", error.message);
    return NextResponse.json(
      { message: "No se pudo consultar los usuarios. Intenta de nuevo." },
      { status: 503 },
    );
  }
}