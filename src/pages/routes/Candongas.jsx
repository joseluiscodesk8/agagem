import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from '../../Context/Cartcontext';
import styles from "../../styles/index.module.scss";

const iamges = [
  "/candongas/c1.jpg",
  "/candongas/c2.jpg",
  "/candongas/c3.jpg",
  "/candongas/c4.jpg",
  "/candongas/c5.jpg",
  "/candongas/c6.jpg",
  "/candongas/c7.jpg",
  "/candongas/c8.jpg",
];

const Candongas = () => {

  const { addToCart } = useCart();

  return (
    <motion.section
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.resina}
    >
      {iamges.map((image, index) => (
        <figure key={index}>
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            width={300}
            height={300}
            loading="lazy"
          />
          <button onClick={() => addToCart({ id: index, image, origin: '/routes/Candongas' })}>Agregar al Carrito</button>
        </figure>
      ))}
    </motion.section>
  );
};

export default Candongas;
