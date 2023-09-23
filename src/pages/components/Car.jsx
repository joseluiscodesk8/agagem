import { useCart } from '../../Context/Cartcontext';
import { useRouter } from "next/router";
import {BsCartCheckFill } from "react-icons/bs";
import styles from "../../styles/index.module.scss";

const Car = () => {
  const { cartCount } = useCart();
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
