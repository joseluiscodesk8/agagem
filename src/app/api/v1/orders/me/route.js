import { NextResponse } from "next/server";
import { getDb, withDbRetry } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: "Debes iniciar sesión para ver tus pedidos." },
      { status: 401 },
    );
  }

  try {
    const orders = await withDbRetry(async () => {
      const sql = await getDb();
      const [user] = await sql`
        SELECT id FROM users WHERE username = ${session.username}
      `;
      if (!user) {
        throw Object.assign(new Error("Usuario no encontrado."), { status: 401 });
      }

      return await sql`
        SELECT
          o.id,
          o.status,
          o.total,
          o.created_at,
          o.shipping_name,
          o.shipping_address,
          o.shipping_city,
          o.shipping_zip,
          o.shipping_country,
          COALESCE(
            jsonb_agg(
              jsonb_build_object(
                'product_id', oi.product_id,
                'quantity', oi.quantity,
                'price', oi.price
              )
            ) FILTER (WHERE oi.id IS NOT NULL),
            '[]'
          ) AS items
        FROM orders o
        LEFT JOIN order_items oi ON oi.order_id = o.id
        WHERE o.user_id = ${user.id}
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `;
    });

    return NextResponse.json({ orders });
  } catch (error) {
    if (error.status) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("orders me:", error.message);
    return NextResponse.json(
      { message: "No se pudieron consultar tus pedidos. Intenta de nuevo." },
      { status: 503 },
    );
  }
}