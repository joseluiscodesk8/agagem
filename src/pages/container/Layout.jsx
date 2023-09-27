import { CartProvider } from "../../Context/Cartcontext";
import Navbar from "../components/Navbar";

const Layout = ({  chiledre, showNavbar = true }) => {
  return (
    <>
      {chiledre}
      {showNavbar && <Navbar />}
      <CartProvider />
    </>
  );
};

export default Layout;
