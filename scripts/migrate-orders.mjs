import { connect } from "./lib-db.mjs";

const sql = await connect(process.env.DATABASE_URL);

await sql.unsafe(`
  CREATE TABLE IF NOT EXISTS orders (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'paid',
    shipping_name text NOT NULL DEFAULT '',
    shipping_address text NOT NULL DEFAULT '',
    shipping_city text NOT NULL DEFAULT '',
    shipping_zip text NOT NULL DEFAULT '',
    shipping_country text NOT NULL DEFAULT '',
    shipping_phone text NOT NULL DEFAULT '',
    total numeric NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
  );
  CREATE TABLE IF NOT EXISTS order_items (
    id serial PRIMARY KEY,
    order_id integer NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id integer NOT NULL REFERENCES products(id),
    quantity int NOT NULL DEFAULT 1,
    price text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  );
  CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
  CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
`);

async function hasColumn(sql) {
  const rows = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'stripe_session_id'
  `;
  return rows.length > 0;
}

if (!(await hasColumn(sql))) {
  await sql.unsafe(`
    ALTER TABLE orders ADD COLUMN stripe_session_id text;
    CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders(stripe_session_id);
  `);
}

const [{ count }] = await sql`SELECT count(*)::int AS count FROM orders`;
console.log(`Esquema de pedidos listo. Pedidos actuales: ${count}.`);
await sql.end();