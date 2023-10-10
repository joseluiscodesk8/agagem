import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from '../../Context/Cartcontext';
import styles from "../../styles/index.module.scss";
import Footer from "../components/Footer";

const imagesData = [
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

  const { addToCart, cartItems } = useCart();
  const [images, setImages] = useState(
    imagesData.map((src, index) => ({
      src: src,
      id: index,
      addedToCart: false,
      price: "47.000",
    }))
  );

  useEffect(() => {
    // Verificar y actualizar el estado del botón al cargar la página
    const updatedImages = images.map((image) => {
      const cartItemIndex = cartItems.findIndex(
        (item) => item.id === image.id && item.origin === "/routes/PulserasDuox3"
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
      origin: "/routes/PulserasDuox3",
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
          <p>
              <b>Pulseras dúox3:</b> 3 pulseras tejidas en hilo celular coreano con 6 piedras de murano cada una, separadores en acero y oro goldfield con 3 dijes de zamak.
            </p>
        </section>
      ))}
    </motion.section>
    <Footer />
    </>
  );
};

export default PulserasDuox3;
