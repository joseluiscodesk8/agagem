import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../../Context/Cartcontext";
import styles from "../../styles/index.module.scss";
import Footer from "../components/Footer";
import topitos from "../products/topitos";
import LazyImage from "../components/LazyImagen";

const Topos = () => {
  const { addToCart, cartItems } = useCart();

  let currentPage = 1;
  const imagesToShow = [topitos][currentPage - 1];

  useEffect(() => {
    // Verificar y actualizar el estado del botón al cargar la página
    const updatedImages = imagesToShow.map((image) => {
      const cartItemIndex = cartItems.findIndex(
        (item) => item.id === image.id && item.origin === "/routes/Topos"
      );
      return {
        ...image,
        addedToCart: cartItemIndex !== -1,
      };
    });
  }, [cartItems, imagesToShow]);

  const handleAddToCart = useCallback((index) => {
    addToCart({
      id: index,
      image: imagesToShow[index].src,
      price: imagesToShow[index].price,
      origin: "/routes/Topos",
    });

    const updatedImages = [...imagesToShow];
    updatedImages[index].addedToCart = true;
  }, [addToCart, imagesToShow]);

  return (
    <>
      <Head>
        <title>Topos</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <motion.section
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.resina}
      >
        {imagesToShow.map((image, index) => (
          <section key={index}>
            <picture>
            <LazyImage
                src={image.src}
                alt={`Slide ${index + 1}`}
              />
            </picture>
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
            <p>{image.description}</p>
          </section>
        ))}
      </motion.section>
      <Footer />
    </>
  );
};

export default Topos;
