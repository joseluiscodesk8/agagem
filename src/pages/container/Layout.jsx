import { CartProvider } from "../../Context/Cartcontext";
import Car from "../components/Car";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

const Layout = ({ chiledre }) => {
  return (
    <>
      {chiledre}
      <Car />
      <Logo />
      <Navbar />
      <CartProvider />
    </>
  );
};

export default Layout;
