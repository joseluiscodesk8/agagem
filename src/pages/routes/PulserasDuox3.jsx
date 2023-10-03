import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from '../../Context/Cartcontext';
import styles from "../../styles/index.module.scss";

const images = [
  "/pulseraDuox3/p1.jpg",
  "/pulseraDuox3/p2.jpg",
  "/pulseraDuox3/p3.jpg",
  "/pulseraDuox3/p4.jpg",
  "/pulseraDuox3/p5.jpg",
  "/pulseraDuox3/p6.jpg",
  "/pulseraDuox3/p7.jpg",
  "/pulseraDuox3/p8.jpg",
  "/pulseraDuox3/p9.jpg",
];

const PulserasDuox3 = () => {

  const { addToCart } = useCart();
  const containerRef = useRef(null);
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const windowHeight = window.innerHeight;
      const containerTop = container.getBoundingClientRect().top;
      if (containerTop < windowHeight / 2) {
        if (visibleImageIndex < images.length - 1) {
          setVisibleImageIndex(prevIndex => prevIndex + 1);
        }
      }
    }
  },[visibleImageIndex])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <motion.section 
    ref={containerRef}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.resina}
    >
      {images.slice(0, visibleImageIndex + 1).map((image, index) => (
        <figure key={index}>
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            width={300}
            height={300}
            priority={false}
            loading="lazy"
          />
          <button onClick={() => addToCart({ id: index, image, origin: '/routes/PulseraDuox3' })}>Agregar al Carrito</button>
        </figure>
      ))}
    </motion.section>
  );
};

export default PulserasDuox3;
