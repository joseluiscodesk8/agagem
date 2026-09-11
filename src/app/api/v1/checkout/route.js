import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getDb, withDbRetry } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { parsePrice } from "@/lib/money";

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: "Debes iniciar sesión para hacer el pago." },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const rawItems = Array.isArray(body?.items) ? body.items : null;
  if (!rawItems?.length) {
    return NextResponse.json({ message: "Tu carrito está vacío." }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret?.startsWith("sk_")) {
    return NextResponse.json(
      { message: "Stripe no está configurado para este sitio." },
      { status: 500 },
    );
  }
  const stripe = new Stripe(secret);

  const items = [];
  for (const item of rawItems) {
    const product_id = Number.parseInt(item?.id, 10);
    if (!Number.isInteger(product_id)) {
      return NextResponse.json(
        { message: "Hay un producto inválido en el carrito." },
        { status: 400 },
      );
    }
    const quantity = Math.min(
      Math.max(Number.parseInt(item?.quantity, 10) || 1, 1),
      99,
    );
    items.push({ product_id, quantity });
  }

  let products;
  try {
    products = await withDbRetry(async () => {
      const sql = await getDb();
      const ids = [...new Set(items.map((item) => item.product_id))];
      return await sql`
        SELECT id, price FROM products WHERE id = ANY(${ids})
      `;
    });
  } catch (error) {
    console.error("checkout:", error.message);
    return NextResponse.json(
      { message: "La base de datos no responde en este momento. Intenta de nuevo en unos segundos." },
      { status: 503 },
    );
  }

  const priceById = new Map(products.map((row) => [row.id, row.price]));

  const line_items = [];
  for (const item of items) {
    const priceText = priceById.get(item.product_id);
    if (priceText == null) {
      return NextResponse.json(
        { message: `No existe el producto #${item.product_id}.` },
        { status: 400 },
      );
    }
    line_items.push({
      quantity: item.quantity,
      metadata: { product_id: String(item.product_id) },
      price_data: {
        currency: "cop",
        product_data: {
          name: `Producto #${item.product_id} · AGAGEM`,
        },
        unit_amount: parsePrice(priceText) * 100,
      },
    });
  }

  const origin = new URL(request.url).origin;

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      metadata: { username: session.username },
      shipping_address_collection: {
        allowed_countries: ["CO", "US", "MX", "ES"],
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("checkout stripe:", error.message);
    return NextResponse.json(
      { message: "No se pudo iniciar el pago con Stripe. Intenta de nuevo." },
      { status: 500 },
    );
  }
}