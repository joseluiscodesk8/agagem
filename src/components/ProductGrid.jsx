"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { useCart } from "@/lib/useCart";
import styles from "./ProductGrid.module.scss";

const ProductGrid = ({ products, origin, admin = false }) => {
  const [items, setItems] = useState(products);
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    setItems(products);
  }, [products]);

  const isInCart = (product) =>
    cartItems.some(
      (item) => item.id === product.id && item.origin === origin
    );

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      image: product.src,
      price: product.price,
      origin,
      quantity: 1,
    });
  };

  const handleUpdated = (id, patch) => {
    setItems((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, ...patch, price: patch.price }
          : product
      )
    );
  };

  return (
    <motion.section
      className={styles.grid}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          origin={origin}
          admin={admin}
          inCart={isInCart(product)}
          onAddToCart={handleAddToCart}
          onUpdated={handleUpdated}
        />
      ))}
    </motion.section>
  );
};

export default ProductGrid;