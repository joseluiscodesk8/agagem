import Image from 'next/image';
import { useCart } from '../../Context/Cartcontext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from "../../styles/index.module.scss";
import Logo from '../components/Logo';

const Carrito = () => {
  const { cartItems, removeFromCart, cartCount } = useCart();
   
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };


  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };


  return (
    <>
    <Logo />
      <section 
      className={styles.carritoContainer}>
      <h1>Shopping Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
         <figure>
         <Image src={item.image} width={300} height={300} alt={`Producto ${index + 1}`} priority={false} />
         </figure>
          <button onClick={() => removeFromCart(item.id, item.origin)}>Eliminar del Carrito</button>
        </div>
      ))}
      <Link href='/'>Home</Link>
    </section>
    </>
  );
};

export default Carrito;