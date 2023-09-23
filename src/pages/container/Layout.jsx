import { CartProvider } from "../../Context/Cartcontext";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

const Layout = ({ chiledre }) => {
  return (
    <>
      {chiledre}
      <Logo />
      <Navbar />
      <CartProvider />
    </>
  );
};

export default Layout;
