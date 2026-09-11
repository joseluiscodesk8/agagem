"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./success.module.scss";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setStatus("error");
      setError("No se encontró la sesión de pago.");
      return;
    }

    fetch(`/api/v1/checkout/success?session_id=${encodeURIComponent(sessionId)}`)
      .then((response) => response.json().catch(() => ({})))
      .then((data) => {
        if (data.ok) {
          setOrder(data);
          setStatus("done");
          clearCart();
        } else {
          setStatus("error");
          setError(data.message || "No se pudo confirmar el pago.");
        }
      })
      .catch(() => {
        setStatus("error");
        setError("Error de conexión al confirmar el pago.");
      });
  }, [searchParams, clearCart]);

  return (
    <motion.section
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {status === "loading" && (
        <>
          <h1>Verificando tu pago...</h1>
          <p className={styles.message}>Un momento, por favor.</p>
        </>
      )}

      {status === "done" && (
        <>
          <div className={styles.successIcon}>✓</div>
          <h1>¡Pago de prueba aprobado!</h1>
          <p className={styles.message}>
            No se realizó ningún cargo real. Tu pedido quedó registrado con el
            número <b>#{order?.orderId}</b> por un total de{" "}
            <b>{order?.totalText} $</b>.
          </p>
          <Link href="/" className={styles.payBtn}>
            Volver al Inicio
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <h1>No se pudo confirmar el pago</h1>
          <p className={styles.error}>{error}</p>
          <Link href="/carrito" className={styles.payBtn}>
            Revisar mi carrito
          </Link>
        </>
      )}
    </motion.section>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<section className={styles.container}>Cargando...</section>}>
      <SuccessContent />
    </Suspense>
  );
}