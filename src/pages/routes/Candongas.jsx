import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from '../../Context/Cartcontext';
import styles from "../../styles/index.module.scss";
import Footer from "../components/Footer";

const imagesData = [
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

  const { addToCart, cartItems } = useCart();
  const [images, setImages] = useState(
    imagesData.map((src, index) => ({
      src: src,
      id: index,
      addedToCart: false,
      price: "26.000",
    }))
  );

  useEffect(() => {
    // Verificar y actualizar el estado del botón al cargar la página
    const updatedImages = images.map((image) => {
      const cartItemIndex = cartItems.findIndex(
        (item) => item.id === image.id && item.origin === "/routes/Candongas"
      );
      return {
        ...image,
        addedToCart: cartItemIndex !== -1,
      };
    });
    setImages(updatedImages);
  }, [cartItems]);

  const handleAddToCart = (index) => {
    addToCart({
      id: index,
      image: images[index].src,
      price: images[index].price,
      origin: "/routes/Candongas",
    });

    const updatedImages = [...images];
    updatedImages[index].addedToCart = true;
    setImages(updatedImages);
  };
  
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
                  onClick={() => handleAddToCart(index)}
                  disabled={image.addedToCart}
                >
                  {image.addedToCart ? "Agregado" : "Agregar al Carrito"}
                </button>
                <h3>
                  <b>Precio:</b> {image.price} $
                </h3>
              </div>
            </section>
      ))}
    </motion.section>
    <Footer />
    </>
  );
};

export default Candongas;
