import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const sql = await getDb();
  const products = await sql`
    SELECT id, category, image_url, price, description
    FROM products
    ORDER BY id
  `;
  return NextResponse.json({ products });
}