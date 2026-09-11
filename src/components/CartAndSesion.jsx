"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/useCart";
import styles from "./CartAndSesion.module.scss";

const CartAndSesion = () => {
  const { cartCount, loggedInUser } = useCart();

  const isAdmin = loggedInUser?.role === "admin";

  return (
    <section className={styles.container}>
      <Link href="/carrito" className={styles.cart} aria-label="Carrito">
        <Image src="/icons/basket.png" alt="carrito" width={22} height={22} />
        <div className={styles.badge}>
          <span>{cartCount}</span>
        </div>
      </Link>
      <section className={styles.login}>
        {isAdmin && (
          <Link href="/admin" className={styles.adminLink}>
            Admin
          </Link>
        )}
        {loggedInUser && !isAdmin && (
          <Link href="/cuenta" className={styles.accountLink}>
            Mi Cuenta
          </Link>
        )}
        <Link href="/login">
          {loggedInUser ? loggedInUser.username : "Log In"}
        </Link>
      </section>
    </section>
  );
};

export default CartAndSesion;