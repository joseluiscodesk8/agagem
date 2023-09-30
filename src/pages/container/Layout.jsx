import { CartProvider } from "../../Context/Cartcontext";
// import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = ({  chiledre, showNavbar = true }) => {
  return (
    <>
      {chiledre}
      {showNavbar && <Navbar />}
      <CartProvider />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
