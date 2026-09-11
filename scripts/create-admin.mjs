
import bcrypt from "bcryptjs";
import { connect } from "./lib-db.mjs";

const sql = await connect(process.env.DATABASE_URL);

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!username || !password) {
  console.error("Faltan ADMIN_USERNAME y/o ADMIN_PASSWORD en el entorno.");
  process.exit(1);
}

const password_hash = await bcrypt.hash(password, 10);

const [user] = await sql`
  INSERT INTO users (username, password_hash, role)
  VALUES (${username}, ${password_hash}, 'admin')
  ON CONFLICT (username)
  DO UPDATE SET role = 'admin', password_hash = EXCLUDED.password_hash
  RETURNING id, username, role
`;

console.log(`Admin listo: "${user.username}" (role=${user.role}).`);
await sql.end();