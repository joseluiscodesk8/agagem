"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { parsePrice, formatPrice } from "@/lib/money";
import styles from "./checkout.module.scss";

function CheckoutContent() {
  const { cartItems, loggedInUser } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("canceled") === "true") {
      setError("Cancelaste el pago. Tu carrito sigue guardado.");
    }
  }, [searchParams]);

  const total = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * (item.quantity ?? 1),
    0,
  );

  const handlePay = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/v1/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity ?? 1,
          })),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message || "No se pudo iniciar el pago.");
        return;
      }

      console.log(data.url);
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Stripe no devolvió una página de pago.");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
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
        <h1>Pago de prueba</h1>
        <p className={styles.message}>
          Para completar la compra necesitas iniciar sesión.
        </p>
        <div className={styles.links}>
          <Link href="/login">Iniciar Sesión</Link>
          <Link href="/register">Registrarse</Link>
        </div>
        <Link href="/carrito" className={styles.back}>
          Volver al carrito
        </Link>
      </motion.section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <motion.section
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Pago de prueba</h1>
        <p className={styles.message}>Tu carrito está vacío.</p>
        <div className={styles.links}>
          <Link href="/">Ir a la tienda</Link>
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
      <h1>Pago de prueba</h1>

      <div className={styles.summary}>
        <h3>Resumen del pedido</h3>
        <ul className={styles.items}>
          {cartItems.map((item) => (
            <li key={`${item.id}-${item.origin}`} className={styles.item}>
              <Image
                src={item.image}
                width={44}
                height={44}
                alt={`Producto ${item.id}`}
              />
              <div className={styles.itemInfo}>
                <span>{item.price} $</span>
                <span className={styles.qty}>× {item.quantity ?? 1}</span>
              </div>
            </li>
          ))}
        </ul>
        <h4>Total: {formatPrice(total)} $</h4>
      </div>

      <p className={styles.testHint}>
        Modo prueba con Stripe: te redirigimos a una pasarela segura. Usa la
        tarjeta <b>4242 4242 4242 4242</b>, cualquier fecha futura y CVC de 3 o
        4 dígitos. No se realizan cargos reales. La dirección de envío la
        ingresas en la página de Stripe.
      </p>

      {error && <p className={styles.error}>{error}</p>}

      <button
        type="button"
        className={styles.payBtn}
        onClick={handlePay}
        disabled={loading}
      >
        {loading
          ? "Conectando con Stripe..."
          : `Pagar ${formatPrice(total)} $ (prueba)`}
      </button>
    </motion.section>
  );
};

export default function Checkout() {
  return (
    <Suspense fallback={<section className={styles.container}>Cargando...</section>}>
      <CheckoutContent />
    </Suspense>
  );
}