import { getDb } from "./db";

export async function getProductsByCategory(category) {
  const sql = await getDb();
  const rows = await sql`
    SELECT id, image_url, price, description
    FROM products
    WHERE category = ${category}
    ORDER BY sort_order, id
  `;
  return rows.map((product) => ({
    id: product.id,
    src: product.image_url,
    price: product.price,
    description: product.description,
  }));
}

export async function getAllProducts() {
  const sql = await getDb();
  const rows = await sql`
    SELECT id, category, image_url, price, description
    FROM products
    ORDER BY sort_order, id
  `;
  return rows.map((product) => ({
    id: product.id,
    category: product.category,
    src: product.image_url,
    price: product.price,
    description: product.description,
  }));
}