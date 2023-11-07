import React, { useState } from "react";
import FormularioCliente from "../components/FormularioCliente";
import { useCart } from "../../Context/Cartcontext";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/index.module.scss";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

const Carrito = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clienteInfo, setClienteInfo] = useState(null);
  const { cartItems, removeFromCart, cartCount } = useCart();

  const enviarCarritoAlBackend = async (cartItems, clienteData) => {
    try {
      const response = await fetch("http://localhost:3000/api/enviar-carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems, clienteData }),
      });
      console.log({ cartItems, clienteData });
      

      if (response.ok) {
        console.log("Datos del carrito enviados:", cartItems);
        console.log("Datos del cliente enviados:", clienteData);
        setClienteInfo(clienteData);
        setMostrarFormulario(false);
      } else {
        console.error("Error al enviar datos al backend.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const totalPrecio = cartItems
    .reduce((total, item) => total + parseFloat(item.price), 0)
    .toFixed(3);

  return (
    <>
      <Logo />
      <section className={styles.carritoContainer}>
        <h1>Shopping Cart</h1>
        {cartItems.map((item, index) => (
          <section key={index}>
            <figure>
              <Image
                src={item.image}
                width={300}
                height={300}
                alt={`Producto ${index + 1}`}
                priority={false}
              />
            </figure>
            <p>
              <b>Precio:</b> {item.price} $
            </p>
            <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
          </section>
        ))}
        <div>
          <h3>Productos en el carrito: {cartCount}</h3>
          <h2>Total: {totalPrecio} $</h2>
        </div>
        {!mostrarFormulario && (
          <button>Gracias por su compra</button>
        )}
        {mostrarFormulario && (
          <div>
            <h2>Información del Cliente:</h2>
            <FormularioCliente onSubmit={(clienteData) => enviarCarritoAlBackend(cartItems, clienteData)} />
          </div>
        )}
        <Link href="/">
          Volver al Inicio
        </Link>
      </section>
      <Footer />
    </>
  );
};

export default Carrito;

