import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pulseras Duo",
  description:
    "Duo de pulseras en murano, elásticas con dijes en zamak y separadores en acero. Personalizadas.",
};

export default async function PulserasDuoPage() {
  const products = await getProductsByCategory("pulserasDuo");
  const session = await getSession();
  return (
    <ProductGrid
      products={products}
      origin="/pulseras-duo"
      admin={session?.role === "admin"}
    />
  );
}