import Image from "next/image";
import { useCart } from "../../Context/Cartcontext";
import Link from "next/link";
import styles from "../../styles/index.module.scss";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

const Carrito = () => {
  const { cartItems, removeFromCart, cartCount } = useCart();

  const totalPrecio = cartItems
    .reduce((total, item) => total + parseFloat(item.price), 0)
    .toFixed(3);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Logo />
      <section className={styles.carritoContainer}>
        <h1>Shopping Cart</h1>
        {cartItems.map((item, index) => (
          <section key={index}>
            <figure>
              <Image
                src={item.image}
                width={300}
                height={300}
                alt={`Producto ${index + 1}`}
                priority={false}
              />
            </figure>
            <p>
              <b>Precio:</b> {item.price} $
            </p>
            <button onClick={() => removeFromCart(item.id, item.origin)}>
              Eliminar
            </button>
          </section>
        ))}
        <div>
          <h3>Productos en el carrito: {cartCount}</h3>
          <h2>Total: {totalPrecio} $</h2>
        </div>
        <Link href="/">Home</Link>
      </section>
      <Footer />
    </>
  );
};

export default Carrito;
