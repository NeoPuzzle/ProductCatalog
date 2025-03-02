import { notFound } from "next/navigation";
import { fetchProductsByCategory } from "@/services/apiService";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("@/components/ProductCard"), { ssr: false });

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  let products;
  try {
    products = await fetchProductsByCategory(slug);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    notFound();
  }

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Categoría: {slug}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
