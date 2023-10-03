import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from '../../Context/Cartcontext';
import styles from "../../styles/index.module.scss";
import Footer from "../components/Footer";

const images = [
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
    <>
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
            <button onClick={() => addToCart({ id: index, image, origin: '/routes/Resina' })}>Agregar al Carrito</button>
          </figure>
        ))}
      </motion.section>
      <Footer />
    </>
  );
};

export default Resina;

