import { CartProvider } from "../../Context/Cartcontext";
import Navbar from "../components/Navbar";

const Layout = ({ children, showNavbar = true }) => {
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      <CartProvider />
    </>
  );
};

export default Layout;

