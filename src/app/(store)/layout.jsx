import CartAndSesion from "@/components/CartAndSesion";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function StoreLayout({ children }) {
  return (
    <>
      <ScrollToTop />
      <CartAndSesion />
      <Logo />
      <aside className="leftColumn">
        <Navbar />
        {children}
        <Footer side />
      </aside>
    </>
  );
}