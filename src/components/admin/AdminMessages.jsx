"use client";

import { useState } from "react";
import styles from "./AdminMessages.module.scss";

const formatDate = (value) =>
  value ? new Date(value).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" }) : "";

const AdminMessages = ({ messages }) => {
  const [items, setItems] = useState(messages);
  const [busyId, setBusyId] = useState(null);
  const [errors, setErrors] = useState({});

  if (!items.length) {
    return <p className={styles.empty}>No hay mensajes de clientes.</p>;
  }

  const resolve = async (id) => {
    setBusyId(id);
    setErrors((prev) => ({ ...prev, [id]: "" }));
    try {
      const response = await fetch(`/api/v1/support/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "resuelta" }),
      });
      if (response.ok) {
        setItems((prev) =>
          prev.map((message) =>
            message.id === id ? { ...message, status: "resuelta" } : message,
          ),
        );
      } else {
        const data = await response.json().catch(() => ({}));
        setErrors((prev) => ({ ...prev, [id]: data.message || "Error." }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, [id]: "Error de conexión." }));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <ul className={styles.list}>
      {items.map((message) => (
        <li
          key={message.id}
          className={`${styles.card} ${
            message.status === "resuelta" ? styles.resolved : ""
          }`}
        >
          <div className={styles.head}>
            <div>
              <b>{message.username}</b>
              {message.order_id && (
                <span className={styles.orderRef}>Pedido #{message.order_id}</span>
              )}
              <span className={styles.meta}>{formatDate(message.created_at)}</span>
            </div>
            {message.status === "pendiente" ? (
              <button
                type="button"
                className={styles.resolveBtn}
                onClick={() => resolve(message.id)}
                disabled={busyId === message.id}
              >
                {busyId === message.id ? "..." : "Marcar resuelta"}
              </button>
            ) : (
              <span className={styles.resolvedTag}>Resuelta</span>
            )}
          </div>
          <p className={styles.text}>{message.message}</p>
          {errors[message.id] && <p className={styles.error}>{errors[message.id]}</p>}
        </li>
      ))}
    </ul>
  );
};

export default AdminMessages;