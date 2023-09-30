import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from '../../Context/Cartcontext';
import styles from "../../styles/index.module.scss";

const iamges = [
  "/tobilleras/t1.jpg",
  "/tobilleras/t2.jpg",
  "/tobilleras/t3.jpg",
  "/tobilleras/t4.jpg",
];

const Tobilleras = () => {

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
          <button onClick={() => addToCart({ id: index, image, origin: '/routes/Tobilleras' })}>Agregar al Carrito</button>
        </figure>
      ))}
    </motion.section>
  );
};

export default Tobilleras;
