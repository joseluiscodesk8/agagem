import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Resina",
  description:
    "Llaveros, lapiceros y accesorios personalizados en resina. Colores, incrustaciones y colgantes a tu gusto.",
};

export default async function ResinaPage() {
  const products = await getProductsByCategory("resina");
  const session = await getSession();
  return (
    <ProductGrid
      products={products}
      origin="/resina"
      admin={session?.role === "admin"}
    />
  );
}