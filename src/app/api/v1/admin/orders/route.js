import { NextResponse } from "next/server";
import { getDb, withDbRetry } from "@/lib/db";
import { getSession } from "@/lib/auth";

const ORDER_QUERY = (whereClause) => `
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
    u.username,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', oi.id,
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'price', oi.price
        )
      ) FILTER (WHERE oi.id IS NOT NULL),
      '[]'
    ) AS items
  FROM orders o
  LEFT JOIN users u ON u.id = o.user_id
  LEFT JOIN order_items oi ON oi.order_id = o.id
  ${whereClause}
  GROUP BY o.id, u.username
  ORDER BY o.created_at DESC
`;

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { message: "No tienes permisos de administrador." },
      { status: 403 },
    );
  }

  try {
    const orders = await withDbRetry(async () => {
      const sql = await getDb();
      return await sql.unsafe(ORDER_QUERY(""));
    });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("admin orders:", error.message);
    return NextResponse.json(
      { message: "No se pudo consultar los pedidos. Intenta de nuevo." },
      { status: 503 },
    );
  }
}