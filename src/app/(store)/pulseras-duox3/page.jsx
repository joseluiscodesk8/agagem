import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pulseras Triples",
  description:
    "Trios y cuartetos de pulseras en cordón peruano, hilo vibora y brillante, con dijes en zamak y resina.",
};

export default async function PulserasDuox3Page() {
  const products = await getProductsByCategory("pulserasDuox3");
  const session = await getSession();
  return (
    <ProductGrid
      products={products}
      origin="/pulseras-duox3"
      admin={session?.role === "admin"}
    />
  );
}