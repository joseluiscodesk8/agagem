import { useState } from 'react';
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Layout from "./container/Layout";
import { CartProvider } from "../Context/Cartcontext";

export default function App({ Component, pageProps }) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const router = useRouter();

  const pagesWithoutNavbar = ['/Carrito', '/Login'];
  const pagesWithoutSesion = ['/Carrito', '/Login'];
  const pagesWithoutcart = ['/Login']

  const showNavbar = !pagesWithoutNavbar.includes(router.pathname);
  const showSesion = !pagesWithoutSesion.includes(router.pathname);
  const showCart = !pagesWithoutcart.includes(router.pathname);

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
    router.push('/Login'); // Redirige a la página de inicio de sesión al cerrar sesión.
  };

  return (
    <>
      <CartProvider>
        <Layout  showNavbar={showNavbar} showSesion={showSesion} showCart={showCart}/>
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}
