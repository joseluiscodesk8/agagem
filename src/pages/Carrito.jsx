import Image from 'next/image';
import { useCart } from '../Context/Cartcontext';
import Link from 'next/link';
import styles from "../styles/index.module.scss";
import Logo from './components/Logo';

const Carrito = () => {
  const { cartItems, removeFromCart } = useCart();


  return (
    <>
    <Logo />
      <section className={styles.carritoContainer}>
      <h1>Shopping Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
         <figure>
         <Image src={item.image} width={300} height={300} alt={`Producto ${index + 1}`} />
         </figure>
          <button onClick={() => removeFromCart(item.id)}>Eliminar del Carrito</button>
        </div>
      ))}
      <Link href='/'>Home</Link>
    </section>
    </>
  );
};

export default Carrito;