"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LazyImage from "./LazyImage";
import styles from "./ProductCard.module.scss";

const ProductCard = ({
  product,
  origin,
  admin,
  inCart,
  onAddToCart,
  onUpdated,
}) => {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [draft, setDraft] = useState({
    imageUrl: product.src,
    price: product.price,
    description: product.description,
  });

  useEffect(() => {
    setDraft({
      imageUrl: product.src,
      price: product.price,
      description: product.description,
    });
  }, [product]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setIsMobile(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/v1/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: draft.imageUrl,
          price: draft.price,
          description: draft.description,
        }),
      });

      if (response.ok) {
        onUpdated(product.id, {
          src: draft.imageUrl,
          price: draft.price,
          description: draft.description,
        });
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          setEditing(false);
        }, 700);
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.message || "No se pudo guardar el producto.");
      }
    } catch {
      alert("Error de conexión al guardar.");
    } finally {
      setSaving(false);
    }
  };

  const update = (key) => (event) =>
    setDraft((prev) => ({ ...prev, [key]: event.target.value }));

  const inlineEditing = editing && !isMobile;

  return (
    <>
      <section className={styles.card}>
        <picture className={styles.picture}>
          <LazyImage
            src={editing ? draft.imageUrl : product.src}
            alt={`Producto ${product.id}`}
          />
        </picture>

        {admin && inlineEditing && (
          <label className={styles.fieldBox}>
            <span>URL de la imagen</span>
            <input
              type="text"
              value={draft.imageUrl}
              onChange={update("imageUrl")}
              placeholder="https://..."
            />
          </label>
        )}

        <div
          className={`${styles.priceRow} ${
            admin && !inlineEditing ? styles.priceRowCentered : ""
          }`}
        >
          {inlineEditing ? (
            <label className={styles.fieldBox}>
              <span>Precio</span>
              <input
                type="text"
                value={draft.price}
                onChange={update("price")}
                aria-label="Precio"
              />
            </label>
          ) : (
            <>
              {!admin && (
                <button
                  type="button"
                  className={styles.cartBtn}
                  onClick={() => onAddToCart(product)}
                  disabled={inCart}
                >
                  <span>{inCart ? "Agregado" : "Agregar al Carrito"}</span>
                </button>
              )}
              <h4 className={styles.priceText}>
                <b>Precio:</b> {product.price} $
              </h4>
            </>
          )}
        </div>

        {inlineEditing ? (
          <label className={styles.fieldBox}>
            <span>Descripción</span>
            <textarea
              rows={4}
              value={draft.description}
              onChange={update("description")}
              aria-label="Descripción"
            />
          </label>
        ) : (
          <p className={styles.desc}>{product.description}</p>
        )}

        {admin &&
          (inlineEditing ? (
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar"}
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setEditing(false)}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.editToggle}
              onClick={() => setEditing(true)}
            >
              Editar producto
            </button>
          ))}
      </section>

      <AnimatePresence>
        {isMobile && editing && (
          <motion.div
            className={styles.fullscreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.fullscreenHeader}>
              <h3>Editar producto #{product.id}</h3>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setEditing(false)}
                aria-label="Cerrar editor"
              >
                ×
              </button>
            </div>

            <label className={styles.field}>
              URL de la imagen
              <input
                type="text"
                value={draft.imageUrl}
                onChange={update("imageUrl")}
                placeholder="https://..."
              />
            </label>

            <label className={styles.field}>
              Precio
              <input
                type="text"
                value={draft.price}
                onChange={update("price")}
              />
            </label>

            <label className={styles.field}>
              Descripción
              <textarea
                rows={7}
                value={draft.description}
                onChange={update("description")}
              />
            </label>

            <button
              type="button"
              className={styles.fullscreenSave}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar cambios"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;