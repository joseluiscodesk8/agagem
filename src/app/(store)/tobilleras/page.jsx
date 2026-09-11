import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tobilleras",
  description:
    "Tobilleras artesanales. Pregunta por la disponibilidad de cada modelo.",
};

export default async function TobillerasPage() {
  const products = await getProductsByCategory("tobilleras");
  const session = await getSession();
  return (
    <ProductGrid
      products={products}
      origin="/tobilleras"
      admin={session?.role === "admin"}
    />
  );
}