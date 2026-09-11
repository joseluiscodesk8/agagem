import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Topos",
  description:
    "Topos artesanales. Pregunta por la disponibilidad de cada modelo.",
};

export default async function ToposPage() {
  const products = await getProductsByCategory("topos");
  const session = await getSession();
  return (
    <ProductGrid
      products={products}
      origin="/topos"
      admin={session?.role === "admin"}
    />
  );
}