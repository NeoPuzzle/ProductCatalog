import { notFound } from "next/navigation";
import { fetchProductsByCategory } from "@/services/apiService";
import { Footer } from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import HeaderWrapper from "@/components/HeaderWrapper";
import { Product } from "@/types/product";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  if (!resolvedParams) return notFound();

  const slug = resolvedParams.slug;


  try {
    const products = await fetchProductsByCategory(slug);
    if (!products || products.length === 0) {
      return notFound();
    }

    return (
      <div>
        <HeaderWrapper />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 capitalize">Categoría: {decodeURIComponent(slug)}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return notFound();
  }
}