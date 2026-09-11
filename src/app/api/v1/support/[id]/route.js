import { NextResponse } from "next/server";
import { getDb, withDbRetry } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PATCH(request, { params }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { message: "No tienes permisos de administrador." },
      { status: 403 },
    );
  }

  const { id } = await params;
  const messageId = Number.parseInt(id, 10);
  if (!Number.isInteger(messageId)) {
    return NextResponse.json({ message: "ID inválido." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const status = String(body?.status ?? "").trim();
  if (!["pendiente", "resuelta"].includes(status)) {
    return NextResponse.json(
      { message: "Estado inválido." },
      { status: 400 },
    );
  }

  try {
    const updated = await withDbRetry(async () => {
      const sql = await getDb();
      return await sql`
        UPDATE support_messages
        SET status = ${status}
        WHERE id = ${messageId}
        RETURNING id, status
      `;
    });

    if (!updated.length) {
      return NextResponse.json(
        { message: "Mensaje no encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: updated[0] });
  } catch (error) {
    console.error("support patch:", error.message);
    return NextResponse.json(
      { message: "No se pudo actualizar el mensaje." },
      { status: 503 },
    );
  }
}