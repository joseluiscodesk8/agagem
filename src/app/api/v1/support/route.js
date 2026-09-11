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
    const messages = await withDbRetry(async () => {
      const sql = await getDb();
      return await sql`
        SELECT
          sm.id,
          sm.order_id,
          sm.message,
          sm.status,
          sm.created_at,
          u.username
        FROM support_messages sm
        JOIN users u ON u.id = sm.user_id
        ORDER BY
          CASE WHEN sm.status = 'pendiente' THEN 0 ELSE 1 END,
          sm.created_at DESC
      `;
    });
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("support list:", error.message);
    return NextResponse.json(
      { message: "No se pudieron consultar los mensajes." },
      { status: 503 },
    );
  }
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: "Debes iniciar sesión para escribirnos." },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const message = String(body?.message ?? "").trim();
  if (message.length < 5) {
    return NextResponse.json(
      { message: "Cuéntanos un poco más (mínimo 5 caracteres)." },
      { status: 400 },
    );
  }

  const orderId =
    body?.order_id != null && String(body.order_id).trim() !== ""
      ? Number.parseInt(body.order_id, 10)
      : null;

  try {
    await withDbRetry(async () => {
      const sql = await getDb();
      const [user] = await sql`
        SELECT id FROM users WHERE username = ${session.username}
      `;
      if (!user) {
        throw Object.assign(new Error("Usuario no encontrado."), { status: 401 });
      }

      if (orderId != null && Number.isInteger(orderId)) {
        const [order] = await sql`
          SELECT id FROM orders WHERE id = ${orderId} AND user_id = ${user.id}
        `;
        if (!order) {
          throw Object.assign(
            new Error("Ese pedido no pertenece a tu cuenta."),
            { status: 403 },
          );
        }
      }

      await sql`
        INSERT INTO support_messages (user_id, order_id, message)
        VALUES (
          ${user.id},
          ${orderId != null && Number.isInteger(orderId) ? orderId : null},
          ${message}
        )
      `;
    });
  } catch (error) {
    if (error.status) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("support create:", error.message);
    return NextResponse.json(
      { message: "No se pudo enviar el mensaje. Intenta de nuevo." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}