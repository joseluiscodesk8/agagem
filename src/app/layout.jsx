import "@/styles/globals.scss";

export const metadata = {
  title: {
    default: "AGAGEM | Bisutería y Resina",
    template: "%s | AGAGEM",
  },
  description:
    "Bisutería y accesorios artesanales en Medellín: pulseras, candongas, topos, tobilleras y resina personalizada. Hecho a mano.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}