import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from '../../Context/Cartcontext';
import styles from "../../styles/index.module.scss";
import Footer from "../components/Footer";

const iamges = [
  "/llaveros/k1.jpg",
  "/llaveros/k2.jpg",
  "/llaveros/k3.jpg",
  "/llaveros/k4.jpg",
  "/llaveros/k5.jpg",
  "/llaveros/k6.jpg",
  "/llaveros/k7.jpg",
  "/llaveros/k8.jpg",
  "/llaveros/k9.jpg",
  "/llaveros/k10.jpg",
];

const Resina = () => {

  const { addToCart } = useCart();

  return (
    <>
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
          <button onClick={() => addToCart({ id: index, image, origin: '/routes/Resina' })}>Agregar al Carrito</button>
        </figure>
      ))}
    </motion.section>
    <Footer />
    </>
  );
};

export default Resina;

