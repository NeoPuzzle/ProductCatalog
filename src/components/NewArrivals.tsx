"use client";

import { Product } from "@/types/product";
import { fetchNewProducts } from "@/services/apiService";
import { useFetch } from "./hooks/useFetch";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("./ProductCard"), { ssr: false });

export function NewArrivals() {
  const {
    data: newProducts,
    loading,
    error,
  } = useFetch<Product[]>(fetchNewProducts);
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Nuevos Lanzamientos</h2>
          <p className="text-gray-900">
            Los últimos productos que acaban de llegar
          </p>
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500">
            Error al cargar productos. Por favor, intenta nuevamente.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
