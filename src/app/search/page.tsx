import { useRouter } from "next/router";
import { Product } from "@/types/product";
import { useSearchProducts } from "@/components/hooks/useSearchProducts";
import Image from "next/image";

export default function SearchPage() {
  const router = useRouter();
  const searchQuery =
    typeof router.query.query === "string" ? router.query.query : "";

  if (!searchQuery) {
    return <p>Por favor, ingresa un término de búsqueda.</p>;
  }

  const {
    data: products = [],
    isLoading,
    error,
  } = useSearchProducts(searchQuery as string);

  if (isLoading) return <p>Cargando resultados...</p>;
  if (error)
    return (
      <p>
        Error al cargar resultados:{" "}
        {error instanceof Error
          ? error.message
          : "Ocurrió un error desconocido"}
      </p>
    );

  if (products.length === 0) {
    return <p>No se encontraron resultados para "{searchQuery}".</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Resultados para "{searchQuery}"
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={300}
              height={160}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-medium">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            {product.discountPrice && (
              <p className="text-red-500 line-through">
                ${product.discountPrice}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}