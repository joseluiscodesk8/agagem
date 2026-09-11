import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getDb, withDbRetry } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { formatPrice } from "@/lib/money";

export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: "Debes iniciar sesión para ver tu pedido." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json(
      { message: "Parámetro de sesión de Stripe inválido." },
      { status: 400 },
    );
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret?.startsWith("sk_")) {
    return NextResponse.json(
      { message: "Stripe no está configurado para este sitio." },
      { status: 500 },
    );
  }
  const stripe = new Stripe(secret);

  let checkoutSession;
  try {
    checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error("checkout verify:", error.message);
    return NextResponse.json(
      { message: "No se pudo verificar el pago con Stripe." },
      { status: 400 },
    );
  }

  if (checkoutSession.payment_status !== "paid") {
    return NextResponse.json(
      { message: "El pago no está completado." },
      { status: 400 },
    );
  }

  if (checkoutSession.metadata?.username !== session.username) {
    return NextResponse.json(
      { message: "Esta sesión de pago no pertenece a tu usuario." },
      { status: 403 },
    );
  }

  let order;
  try {
    order = await withDbRetry(async () => {
      const sql = await getDb();

      const [existing] = await sql`
        SELECT id, total, created_at
        FROM orders
        WHERE stripe_session_id = ${sessionId}
      `;
      if (existing) return existing;

      const [user] = await sql`
        SELECT id FROM users WHERE username = ${session.username}
      `;
      if (!user) {
        throw Object.assign(new Error("Usuario no encontrado."), { status: 401 });
      }

      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
      const orderItems = [];
      for (const line of lineItems.data) {
        const productId = Number.parseInt(line.metadata?.product_id ?? "", 10);
        const unitAmount = line.price?.unit_amount ?? 0;
        if (!Number.isInteger(productId) || !unitAmount) continue;
        orderItems.push({
          product_id: productId,
          quantity: line.quantity ?? 1,
          price: formatPrice(Math.round(unitAmount / 100)),
        });
      }

      const ship = checkoutSession.shipping;
      const address = ship?.address ?? {};

      return await sql.begin(async (tx) => {
        const [created] = await tx`
          INSERT INTO orders (
            user_id,
            status,
            shipping_name,
            shipping_address,
            shipping_city,
            shipping_zip,
            shipping_country,
            shipping_phone,
            total,
            stripe_session_id
          )
          VALUES (
            ${user.id},
            'pagado',
            ${ship?.name ?? ""},
            ${address.line1 ?? ""},
            ${address.city ?? ""},
            ${address.postal_code ?? ""},
            ${address.country ?? ""},
            ${address.phone ?? ""},
            ${Math.round((checkoutSession.amount_total ?? 0) / 100)},
            ${sessionId}
          )
          RETURNING id, total, created_at
        `;

        if (orderItems.length) {
          await tx`
            INSERT INTO order_items ${tx(
              orderItems.map((item) => ({ order_id: created.id, ...item })),
              "order_id",
              "product_id",
              "quantity",
              "price",
            )}
          `;
        }

        return created;
      });
    });
  } catch (error) {
    if (error.status) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("checkout save:", error.message);
    return NextResponse.json(
      { message: "El pago se aprobó, pero no se pudo guardar el pedido. Contáctanos." },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    orderId: order.id,
    totalText: formatPrice(order.total),
    createdAt: order.created_at,
  });
}