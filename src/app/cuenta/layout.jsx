import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function CuentaLayout({ children }) {
  return (
    <>
      <Logo />
      {children}
      <Footer />
    </>
  );
}