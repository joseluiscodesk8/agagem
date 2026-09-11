import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function CarritoLayout({ children }) {
  return (
    <>
      <Logo />
      {children}
      <Footer />
    </>
  );
}