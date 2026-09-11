"use client";

import { useState } from "react";
import { ORDER_STATUS, ORDER_STATUS_KEYS } from "@/lib/orders";
import { formatPrice } from "@/lib/money";
import styles from "./AdminOrders.module.scss";

const formatDate = (value) =>
  value ? new Date(value).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" }) : "";

const AdminOrders = ({ orders }) => {
  const [items, setItems] = useState(orders);
  const [savingId, setSavingId] = useState(null);
  const [errors, setErrors] = useState({});

  if (!items.length) {
    return <p className={styles.empty}>Aún no hay pedidos.</p>;
  }

  const handleStatus = async (orderId, status) => {
    setSavingId(orderId);
    setErrors((prev) => ({ ...prev, [orderId]: "" }));
    setItems((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );
    try {
      const response = await fetch(`/api/v1/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setErrors((prev) => ({ ...prev, [orderId]: data.message || "Error al actualizar." }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, [orderId]: "Error de conexión." }));
    } finally {
      setSavingId(null);
    }
  };

  return (
    <ul className={styles.list}>
      {items.map((order) => {
        const status = ORDER_STATUS[order.status] ?? { label: order.status, color: "#7c5a36" };
        return (
          <li key={order.id} className={styles.card}>
            <div className={styles.head}>
              <div>
                <b>Pedido #{order.id}</b>
                <span className={styles.meta}>
                  {order.username || "—"} · {formatDate(order.created_at)}
                </span>
              </div>
              <div className={styles.controls}>
                {savingId === order.id && <span className={styles.saving}>Guardando...</span>}
                <select
                  value={order.status}
                  onChange={(e) => handleStatus(order.id, e.target.value)}
                >
                  {ORDER_STATUS_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {ORDER_STATUS[key].label}
                    </option>
                  ))}
                </select>
                <span
                  className={styles.badge}
                  style={{ background: status.color }}
                >
                  {status.label}
                </span>
              </div>
            </div>

            <ul className={styles.items}>
              {order.items.map((item) => (
                <li key={item.id}>
                  Producto #{item.product_id} × {item.quantity} — {item.price} $
                </li>
              ))}
            </ul>

            <div className={styles.foot}>
              <span className={styles.total}>Total: {formatPrice(order.total)} $</span>
              <span className={styles.address}>
                {order.shipping_name || "Sin dirección"} ·{" "}
                {[order.shipping_address, order.shipping_city, order.shipping_zip]
                  .filter(Boolean)
                  .join(", ") || "—"}
              </span>
            </div>

            {errors[order.id] && <p className={styles.error}>{errors[order.id]}</p>}
          </li>
        );
      })}
    </ul>
  );
};

export default AdminOrders;