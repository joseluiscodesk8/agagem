import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function CheckoutLayout({ children }) {
  return (
    <>
      <Logo />
      {children}
      <Footer />
    </>
  );
}