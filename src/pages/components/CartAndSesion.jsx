import React, { useEffect } from "react";
import { useCart } from "../../Context/Cartcontext";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsCartCheckFill } from "react-icons/bs";
import styles from "../../styles/index.module.scss";

const CartAndSesion = () => {
  const { cartCount, cartItems, loggedInUser } = useCart();
  const router = useRouter();

  const goToCart = () => {
    router.push("/carrito");
  };
  return (
    <>
      <section className={styles.cartContainer}>
        <section onClick={goToCart}>
          <BsCartCheckFill />
          <div>
          <span>{cartCount}</span>
          </div>
        </section>
        <section>
        {loggedInUser ? (
            <span>{loggedInUser}</span>
          ) : (
            <Link href={'/Login'}>Login</Link>
          )}
        </section>
      </section>
    </>
  );
};

export default CartAndSesion;
