import Image from 'next/image';
import { useCart } from '../Context/Cartcontext';

const Carrito = () => {
  const { cartItems, removeFromCart } = useCart();

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
