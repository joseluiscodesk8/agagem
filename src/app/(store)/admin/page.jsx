import Link from "next/link";
import { redirect } from "next/navigation";
import { getAllProducts } from "@/lib/products";
import { getDb, withDbRetry } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { formatPrice } from "@/lib/money";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminMessages from "@/components/admin/AdminMessages";
import styles from "./admin.module.scss";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Administración",
  description: "Panel de administración de AGAGEM: catálogo, usuarios, pedidos y mensajes.",
};

const CATEGORY_LINKS = {
  resina: "/resina",
  pulserasDuo: "/pulseras-duo",
  pulserasDuox3: "/pulseras-duox3",
  candongas: "/candongas",
  tobilleras: "/tobilleras",
  topos: "/topos",
};

const formatDate = (value) =>
  value ? new Date(value).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" }) : "";

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/login");

  const [products, users, orders, messages] = await Promise.all([
    getAllProducts(),
    fetchUsers(),
    fetchOrders(),
    fetchMessages(),
  ]);

  const grouped = products.reduce((acc, product) => {
    (acc[product.category] ||= []).push(product);
    return acc;
  }, {});

  return (
    <section className={styles.page}>
      <h2>Panel de administración</h2>
      <p className={styles.hint}>
        Administra catálogo, pedidos, usuarios y mensajes de tus clientes.
      </p>

      <section className={styles.section}>
        <h3>Pedidos</h3>
        <AdminOrders orders={orders} />
      </section>

      <section className={styles.section}>
        <h3>Usuarios registrados</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Registrado</th>
                <th>Compras</th>
                <th>Total gastado</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.username}
                    {user.role === "admin" && (
                      <span className={styles.adminTag}>admin</span>
                    )}
                  </td>
                  <td>{user.email || "—"}</td>
                  <td>{user.phone || "—"}</td>
                  <td>{formatDate(user.created_at)}</td>
                  <td className={user.order_count > 0 ? styles.hasOrders : ""}>
                    {user.order_count ?? 0}
                  </td>
                  <td>{formatPrice(user.total_spent)} $</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h3>Mensajes de clientes</h3>
        <AdminMessages messages={messages} />
      </section>

      <section className={styles.section}>
        <h3>Productos</h3>
        <p className={styles.hint}>
          Haz clic en “Editar” para cambiar imagen, precio o descripción desde la
          página de cada categoría.
        </p>
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} className={styles.group}>
            <h4>{category}</h4>
            <ul>
              {items.map((product) => (
                <li key={product.id}>
                  <img src={product.src} alt="" width={40} height={40} />
                  <span>#{product.id}</span>
                  <span className={styles.price}>{product.price} $</span>
                  <Link
                    href={CATEGORY_LINKS[category] ?? "/"}
                    className={styles.edit}
                  >
                    Editar
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </section>
  );
}

async function fetchUsers() {
  try {
    return await withDbRetry(async () => {
      const sql = await getDb();
      return await sql`
        SELECT
          u.id,
          u.username,
          u.role,
          u.email,
          u.phone,
          u.created_at,
          COUNT(o.id) FILTER (WHERE o.status <> 'cancelado') AS order_count,
          COALESCE(SUM(o.total) FILTER (WHERE o.status <> 'cancelado'), 0) AS total_spent
        FROM users u
        LEFT JOIN orders o ON o.user_id = u.id
        GROUP BY u.id
        ORDER BY u.created_at DESC
      `;
    });
  } catch (error) {
    console.error("admin users query:", error.message);
    return [];
  }
}

async function fetchOrders() {
  try {
    return await withDbRetry(async () => {
      const sql = await getDb();
      return await sql.unsafe(`
        SELECT
          o.id,
          o.status,
          o.total,
          o.created_at,
          o.shipping_name,
          o.shipping_address,
          o.shipping_city,
          o.shipping_zip,
          o.shipping_country,
          u.username,
          COALESCE(
            jsonb_agg(
              jsonb_build_object(
                'id', oi.id,
                'product_id', oi.product_id,
                'quantity', oi.quantity,
                'price', oi.price
              )
            ) FILTER (WHERE oi.id IS NOT NULL),
            '[]'
          ) AS items
        FROM orders o
        LEFT JOIN users u ON u.id = o.user_id
        LEFT JOIN order_items oi ON oi.order_id = o.id
        GROUP BY o.id, u.username
        ORDER BY o.created_at DESC
      `);
    });
  } catch (error) {
    console.error("admin orders query:", error.message);
    return [];
  }
}

async function fetchMessages() {
  try {
    return await withDbRetry(async () => {
      const sql = await getDb();
      return await sql`
        SELECT
          sm.id,
          sm.order_id,
          sm.message,
          sm.status,
          sm.created_at,
          u.username
        FROM support_messages sm
        JOIN users u ON u.id = sm.user_id
        ORDER BY
          CASE WHEN sm.status = 'pendiente' THEN 0 ELSE 1 END,
          sm.created_at DESC
      `;
    });
  } catch (error) {
    console.error("admin messages query:", error.message);
    return [];
  }
}