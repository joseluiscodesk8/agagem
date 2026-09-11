"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { parsePrice, formatPrice } from "@/lib/money";
import { useCart } from "@/lib/useCart";
import styles from "./carrito.module.scss";

const Carrito = () => {
  const { cartItems, removeFromCart, cartCount, loggedInUser } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * (item.quantity ?? 1),
    0,
  );

  return (
    <motion.section
      className={styles.container}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Carrito de compras</h1>

      {cartItems.length === 0 ? (
        <div className={styles.empty}>
          <p>Tu carrito está vacío.</p>
          <Link href="/">Volver al Inicio</Link>
        </div>
      ) : (
        <>
          <ul className={styles.items}>
            {cartItems.map((item) => (
              <li key={`${item.id}-${item.origin}`} className={styles.item}>
                <Image
                  src={item.image}
                  width={50}
                  height={50}
                  alt={`Producto ${item.id}`}
                />
                <div className={styles.itemInfo}>
                  <p>
                    <b>Precio:</b> {item.price} $
                  </p>
                  <p className={styles.qty}>Cantidad: {item.quantity ?? 1}</p>
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id, item.origin)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.summary}>
            <h3>Productos en el carrito: {cartCount}</h3>
            <h2>Total: {formatPrice(total)} $</h2>
          </div>

          {loggedInUser ? (
            <Link href="/checkout" className={styles.payBtn}>
              Proceder al Pago
            </Link>
          ) : (
            <div className={styles.loginPrompt}>
              <p>Para pagar necesitas iniciar sesión.</p>
              <Link href="/login">Iniciar Sesión</Link>
              <Link href="/register">Registrarse</Link>
            </div>
          )}
        </>
      )}

      <Link href="/" className={styles.backLink}>
        Volver al Inicio
      </Link>
    </motion.section>
  );
};

export default Carrito;