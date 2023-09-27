// En el componente Carrito
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../Context/Cartcontext';
import Link from 'next/link';

const Carrito = () => {
  const { cartItems, removeFromCart } = useCart();


  return (
    <>
      <div>
      <h1>Carrito de Compras</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
          <Image src={item.image} width={300} height={300} alt={`Producto ${index + 1}`} />
          <button onClick={() => removeFromCart(item.id)}>Eliminar del Carrito</button>
        </div>
      ))}
    </div>
    <Link href='/'>Home</Link>
    </>
  );
};

export default Carrito;