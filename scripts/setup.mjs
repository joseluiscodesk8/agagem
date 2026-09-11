
import fs from "node:fs";
import path from "node:path";
import { connect } from "./lib-db.mjs";

const sql = await connect(process.env.DATABASE_URL);

const dataDir = path.join(process.cwd(), "src", "data", "products");

const PRODUCT_PATTERN =
  /id:\s*(\d+),\s*src:\s*"([^"]+)",\s*price:\s*"([^"]+)",\s*description:\s*"([^]*?)"\s*,?\s*}\s*/gs;

function parseFile(category, file) {
  const content = fs.readFileSync(path.join(dataDir, file), "utf8");
  const rows = [];
  for (const match of content.matchAll(PRODUCT_PATTERN)) {
    rows.push({
      category,
      image_url: match[2],
      price: match[3],
      description: match[4],
      sort_order: Number(match[1]),
    });
  }
  return rows;
}

const FILES = [
  "resina.js",
  "pulserasDuo.js",
  "pulserasDuox3.js",
  "candongas.js",
  "tobilleras.js",
  "topos.js",
];

const rows = [];
for (const file of FILES) {
  const category = file.replace(".js", "");
  rows.push(...parseFile(category, file));
}

if (rows.length === 0) {
  console.error("No se encontraron productos en los data files.");
  process.exit(1);
}

await sql.begin((tx) => [
  tx.unsafe(`
    CREATE TABLE IF NOT EXISTS users (
      id serial PRIMARY KEY,
      username text UNIQUE NOT NULL,
      password_hash text NOT NULL,
      role text NOT NULL DEFAULT 'user',
      created_at timestamptz NOT NULL DEFAULT now()
    )`),
  tx.unsafe(`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS email text,
                          ADD COLUMN IF NOT EXISTS phone text`),
  tx.unsafe(`
    CREATE TABLE IF NOT EXISTS products (
      id serial PRIMARY KEY,
      category text NOT NULL DEFAULT '',
      image_url text NOT NULL,
      price text NOT NULL,
      description text NOT NULL DEFAULT '',
      sort_order int NOT NULL DEFAULT 0,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )`),
  tx.unsafe("TRUNCATE products RESTART IDENTITY"),
]);

await sql`INSERT INTO products ${sql(rows, "category", "image_url", "price", "description", "sort_order")}`;

const [{ count }] = await sql`SELECT count(*)::int AS count FROM products`;
console.log(`Esquema listo. Productos en la BD: ${count}.`);
await sql.end();