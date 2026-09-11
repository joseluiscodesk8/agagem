import { NextResponse } from "next/server";
import { getDb, withDbRetry } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isOrderStatus } from "@/lib/orders";

export async function PATCH(request, { params }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { message: "No tienes permisos de administrador." },
      { status: 403 },
    );
  }

  const { id } = await params;
  const orderId = Number.parseInt(id, 10);
  if (!Number.isInteger(orderId)) {
    return NextResponse.json({ message: "ID inválido." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const status = String(body?.status ?? "");
  if (!isOrderStatus(status)) {
    return NextResponse.json(
      { message: "Estado inválido." },
      { status: 400 },
    );
  }

  try {
    const updated = await withDbRetry(async () => {
      const sql = await getDb();
      return await sql`
        UPDATE orders
        SET status = ${status}
        WHERE id = ${orderId}
        RETURNING id, status
      `;
    });

    if (!updated.length) {
      return NextResponse.json(
        { message: "Pedido no encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json({ order: updated[0] });
  } catch (error) {
    console.error("admin order patch:", error.message);
    return NextResponse.json(
      { message: "No se pudo actualizar el pedido. Intenta de nuevo." },
      { status: 503 },
    );
  }
}