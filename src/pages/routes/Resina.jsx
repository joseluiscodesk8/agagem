import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../../Context/Cartcontext";
import styles from "../../styles/index.module.scss";
import Footer from "../components/Footer";

const imagesData = [
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
  const { addToCart, cartItems } = useCart();
  const [images, setImages] = useState(
    imagesData.map((src, index) => ({
      src: src,
      id: index,
      addedToCart: false,
      price: "20.000",
    }))
  );

  useEffect(() => {
    // Verificar y actualizar el estado del botón al cargar la página
    const updatedImages = images.map((image) => {
      const cartItemIndex = cartItems.findIndex(
        (item) => item.id === image.id && item.origin === "/routes/PulserasDuo"
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
      origin: "/routes/PulserasDuo",
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
              <h4>
                <b>Precio:</b> {image.price} $
              </h4>
            </div>
            <p>
              <b>Llaveros en resina:</b> con la inicial de tu nombre con los
              colores y incrustaciones de tu preferencia con cuencas acrílicas luminosas en la oscuridad  borla y un detalle
              adicional.
            </p>
          </section>
        ))}
      </motion.section>
      <Footer />
    </>
  );
};

export default Resina;
