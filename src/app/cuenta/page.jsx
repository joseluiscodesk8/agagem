"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ORDER_STATUS } from "@/lib/orders";
import { formatPrice } from "@/lib/money";
import styles from "./cuenta.module.scss";

const formatDate = (value) =>
  value ? new Date(value).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" }) : "";

const Cuenta = () => {
  const { loggedInUser } = useCart();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    if (loggedInUser?.role === "admin") {
      router.replace("/admin");
      return;
    }
if (loggedInUser?.role === "admin") {
    return (
      <motion.section
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className={styles.message}>Redirigiendo al panel de administración...</p>
      </motion.section>
    );
  }

  if (!loggedInUser) {
      setLoading(false);
      return;
    }
    fetch("/api/v1/orders/me")
      .then((response) => response.json().catch(() => ({})))
      .then((data) => {
        if (data.orders) setOrders(data.orders);
        else setError(data.message || "No se pudieron cargar tus pedidos.");
      })
      .catch(() => setError("Error de conexión al cargar tus pedidos."))
      .finally(() => setLoading(false));
  }, [loggedInUser]);

  const handleSend = async (event) => {
    event.preventDefault();
    setSendError("");
    setSending(true);
    try {
      const response = await fetch("/api/v1/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId || null, message }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setSent(true);
        setMessage("");
        setOrderId("");
      } else {
        setSendError(data.message || "No se pudo enviar el mensaje.");
      }
    } catch {
      setSendError("Error de conexión al enviar el mensaje.");
    } finally {
      setSending(false);
    }
  };

  if (!loggedInUser) {
    return (
      <motion.section
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Mi cuenta</h1>
        <p className={styles.message}>
          Inicia sesión para ver el estado de tus compras.
        </p>
        <div className={styles.links}>
          <Link href="/login">Iniciar Sesión</Link>
          <Link href="/register">Registrarse</Link>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Hola, {loggedInUser.username}</h1>

      <section className={styles.block}>
        <h2>Mis pedidos</h2>
        {loading ? (
          <p className={styles.message}>Cargando pedidos...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : orders.length === 0 ? (
          <p className={styles.message}>
            Todavía no tienes pedidos. <Link href="/">Ir a la tienda</Link>
          </p>
        ) : (
          <ul className={styles.orders}>
            {orders.map((order) => {
              const status = ORDER_STATUS[order.status] ?? {
                label: order.status,
                color: "#7c5a36",
              };
              return (
                <li key={order.id} className={styles.order}>
                  <div className={styles.orderHead}>
                    <b>Pedido #{order.id}</b>
                    <span
                      className={styles.badge}
                      style={{ background: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <span className={styles.meta}>{formatDate(order.created_at)}</span>
                  <ul className={styles.items}>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        Producto #{item.product_id} × {item.quantity} — {item.price} $
                      </li>
                    ))}
                  </ul>
                  <div className={styles.orderFoot}>
                    <span className={styles.total}>
                      Total: {formatPrice(order.total)} $
                    </span>
                    <span className={styles.address}>
                      {[order.shipping_address, order.shipping_city, order.shipping_zip]
                        .filter(Boolean)
                        .join(", ") || "Sin dirección"}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className={styles.block}>
        <h2>Escríbenos</h2>
        <p className={styles.message}>
          ¿Tienes un inconveniente o quieres cancelar un pedido? Cuéntanos y te
          ayudamos.
        </p>
        {sent ? (
          <div className={styles.sentBox}>
            <p>¡Gracias! Recibimos tu mensaje y te responderemos pronto.</p>
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => setSent(false)}
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSend}>
            {orders.length > 0 && (
              <label>
                Pedido relacionado (opcional)
                <select
                  value={orderId}
                  onChange={(event) => setOrderId(event.target.value)}
                >
                  <option value="">— Ninguno —</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      Pedido #{order.id} — {formatPrice(order.total)} $
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label>
              Mensaje
              <textarea
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Cuéntanos qué necesitas..."
                required
              />
            </label>
            {sendError && <p className={styles.error}>{sendError}</p>}
            <button type="submit" className={styles.sendBtn} disabled={sending}>
              {sending ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        )}
      </section>
    </motion.section>
  );
};

export default Cuenta;