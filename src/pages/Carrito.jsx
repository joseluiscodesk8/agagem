// En el componente Carrito
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../Context/Cartcontext';

const Carrito = () => {
  const { cartItems, removeFromCart } = useCart();

  useEffect(() => {
    // Carga el carrito desde el contexto cuando el componente se monta
    // Esto asegura que los datos del carrito estén disponibles después de la recarga de página
  }, []);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
          <Image src={item.image} width={300} height={300} alt={`Producto ${index + 1}`} />
          <button onClick={() => removeFromCart(item.id)}>Eliminar del Carrito</button>
        </div>
      ))}
    </div>
  );
};

export default Carrito;