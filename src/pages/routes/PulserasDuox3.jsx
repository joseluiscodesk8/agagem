import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from '../../Context/Cartcontext';
import styles from "../../styles/index.module.scss";
import Footer from "../components/Footer";
import  tiposPulserasx3  from "../products/TiposPulserasx3";
import { images } from "../../../next.config";

const PulserasDuox3 = () => {

  const { addToCart, cartItems } = useCart();

  let currentPage = 1;
  const imagesToShow = [
    tiposPulserasx3
  ][currentPage - 1];

  useEffect(() => {
    // Verificar y actualizar el estado del botón al cargar la página
    const updatedImages = imagesToShow.map((image) => {
      const cartItemIndex = cartItems.findIndex(
        (item) => item.id === image.id && item.origin === "/routes/PulserasDuox3"
      );
      return {
        ...image,
        addedToCart: cartItemIndex !== -1,
      };
    });
  }, [cartItems, imagesToShow]);

  const handleAddToCart = (index) => {
    addToCart({
      id: index,
      image: imagesToShow[index].src,
      price: imagesToShow[index].price,
      origin: "/routes/PulserasDuox3",
    });

    const updatedImages = [...imagesToShow];
    updatedImages[index].addedToCart = true;
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
      {imagesToShow.map((image, index) => (
          <section key={index}>
          <figure>
            <Image
              src={image.src}
              alt={`Slide ${index + 1}`}
              width={300}
              height={300}
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
          <p>{image.description}</p>
        </section>
      ))}
    </motion.section>
    <Footer />
    </>
  );
};

export default PulserasDuox3;
