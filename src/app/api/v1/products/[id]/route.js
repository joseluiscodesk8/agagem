import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PATCH(request, { params }) {
  const sql = await getDb();
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { message: "No tienes permisos de administrador." },
      { status: 403 },
    );
  }

  const { id } = await params;
  const productId = Number.parseInt(id, 10);
  if (!Number.isInteger(productId)) {
    return NextResponse.json({ message: "ID inválido." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const image_url = body?.image_url != null ? String(body.image_url).trim() : undefined;
  const price = body?.price != null ? String(body.price).trim() : undefined;
  const description =
    body?.description != null ? String(body.description).trim() : undefined;

  const [updated] = await sql`
    UPDATE products
    SET
      image_url = COALESCE(${image_url ?? null}, image_url),
      price = COALESCE(${price ?? null}, price),
      description = COALESCE(${description ?? null}, description),
      updated_at = now()
    WHERE id = ${productId}
    RETURNING id, category, image_url, price, description
  `;

  if (!updated) {
    return NextResponse.json(
      { message: "Producto no encontrado." },
      { status: 404 },
    );
  }

  return NextResponse.json({ product: updated });
}