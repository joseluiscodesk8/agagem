import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../../Context/Cartcontext";
import styles from "../../styles/index.module.scss";
import Footer from "../components/Footer";

const images = [
  { src: "/llaveros/k1.jpg",  price: '20.000', addedToCart: false },
  { src: "/llaveros/k2.jpg",  price: '20.000', addedToCart: false },
  { src: "/llaveros/k3.jpg",  price: '20.000', addedToCart: false },
  { src: "/llaveros/k4.jpg",  price: '20.000', addedToCart: false },
  { src: "/llaveros/k5.jpg",  price: '20.000', addedToCart: false },
  { src: "/llaveros/k6.jpg",  price: '20.000', addedToCart: false },
  { src: "/llaveros/k7.jpg",  price: '20.000', addedToCart: false },
  { src: "/llaveros/k8.jpg",  price: '20.000', addedToCart: false },
  { src: "/llaveros/k9.jpg",  price: '20.000', addedToCart: false },
  { src: "/llaveros/k10.jpg",  price: '20.000', addedToCart: false },
];

const Resina = () => {
  const { addToCart } = useCart();
  const containerRef = useRef(null);
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const windowHeight = window.innerHeight;
      const containerTop = container.getBoundingClientRect().top;
      if (containerTop < windowHeight / 2) {
        if (visibleImageIndex < images.length - 1) {
          setVisibleImageIndex((prevIndex) => prevIndex + 1);
        }
      }
    }
  }, [visibleImageIndex]);

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
          <section key={index}>
            <figure>
              <Image
                src={image.src}
                alt={`Slide ${index + 1}`}
                width={300}
                height={300}
                priority={false}
                loading="lazy"
              />
            </figure>
            <div>
              <button
                onClick={() => {
                  addToCart({ id: index, image: image.src, price: image.price, origin: "/routes/Resina" });
                  const updatedImages = [...images];
                  updatedImages[index].addedToCart = true;
                  setIsAddingToCart(true);
                }}
                disabled={image.addedToCart}
              >
                {image.addedToCart ? "Agregado" : "Agregar al Carrito"}
              </button>
              <p><b>Precio:</b> {image.price} $</p>
            </div>
          </section>
        ))}
      </motion.section>
      <Footer />
    </>
  );
};

export default Resina;
