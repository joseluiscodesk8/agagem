import { connect } from "./lib-db.mjs";

const sql = await connect(process.env.DATABASE_URL);

await sql.unsafe(`
  CREATE TABLE IF NOT EXISTS support_messages (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id integer REFERENCES orders(id) ON DELETE SET NULL,
    message text NOT NULL,
    status text NOT NULL DEFAULT 'pendiente',
    created_at timestamptz NOT NULL DEFAULT now()
  );
  CREATE INDEX IF NOT EXISTS idx_support_messages_user_id ON support_messages(user_id);
  CREATE INDEX IF NOT EXISTS idx_support_messages_status ON support_messages(status);
`);

const statuses = await sql`
  UPDATE orders SET status = 'pagado' WHERE status = 'paid' OR status = 'pending'
  RETURNING id
`;
console.log(`Status de órdenes normalizado (${statuses.length}).`);

const [{ count }] = await sql`
  SELECT count(*)::int AS count FROM support_messages
`;
console.log(`Esquema de soporte listo. Mensajes actuales: ${count}.`);
await sql.end();