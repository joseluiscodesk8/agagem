import React, { useEffect } from "react";
import { useCart } from "../../Context/Cartcontext";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/index.module.scss";

const CartAndSesion = () => {
  const { cartCount, loggedInUser, setLoggedInUser } = useCart();

  useEffect(() => {
    // Recuperar el usuario logueado desde localStorage al cargar la página
    const storedLoggedInUser = localStorage.getItem("username");
    if (storedLoggedInUser) {
      setLoggedInUser(storedLoggedInUser);
    }
  }, [setLoggedInUser]);

  return (
    <>
      <section className={styles.cartContainer}>
        <section className={styles.itemsContainer}>
          <section>
            <Link href="/routes/Carrito" className="cartIcon" aria-label="icon">
              <Image src="/icons/basket.png" alt="icon" width={22} height={22} />
            </Link>
            <div>
              <span>{cartCount}</span>
            </div>
          </section>
          <section>
            {loggedInUser ? (
              <Link href={"/routes/Login"}>{loggedInUser}</Link>
            ) : (
              <Link href={"/routes/Login"}>Log In</Link>
            )}
          </section>
        </section>
      </section>
    </>
  );
};

export default CartAndSesion;
