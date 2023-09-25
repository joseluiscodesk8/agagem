// En el componente Car
import React, { useEffect } from 'react';
import { useCart } from '../Context/Cartcontext';
import { useRouter } from "next/router";
import { BsCartCheckFill } from "react-icons/bs";
import styles from "../../styles/index.module.scss";

const Car = () => {
  const { cartCount, cartItems } = useCart(); // Agrega cartItems para cargar el carrito
  const router = useRouter();


  const goToCart = () => {
    router.push("/carrito");
  };

  return (
    <>
      <section className={styles.cartContainer} onClick={goToCart}>
        <div>
            <BsCartCheckFill />
        </div>
        <span className={styles.cartCount}>{cartCount}</span>
      </section>
    </>
  );
};

export default Car;