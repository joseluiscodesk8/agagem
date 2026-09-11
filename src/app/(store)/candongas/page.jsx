import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Candongas",
  description:
    "Candongas artesanales. Pregunta por la disponibilidad de cada modelo.",
};

export default async function CandongasPage() {
  const products = await getProductsByCategory("candongas");
  const session = await getSession();
  return (
    <ProductGrid
      products={products}
      origin="/candongas"
      admin={session?.role === "admin"}
    />
  );
}