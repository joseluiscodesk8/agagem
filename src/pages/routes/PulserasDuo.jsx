import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from '../../Context/Cartcontext';
import styles from "../../styles/index.module.scss";
import Footer from "../components/Footer";

const images = [
  "/pulseraDuo/p1.jpg",
  "/pulseraDuo/p2.jpg",
  "/pulseraDuo/p3.jpg",
  "/pulseraDuo/p4.jpg",
  "/pulseraDuo/p5.jpg",
];

const PulseraDuo = () => {

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
        {images.map((image, index) => (
          <figure key={index}>
             <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={300}
              height={300}
              priority={false}
              loading="lazy"
            />
            <button onClick={() => addToCart({ id: index, image, origin: '/routes/PulseraDuo' })}>Agregar al Carrito</button>
          </figure>
        ))}
      </motion.section>
      <Footer/>
    </>
  );
};


export default PulseraDuo;
