'use client';

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Link } from "lucide-react";
import { fetchProducts } from "@/services/apiService";
import { useFetch } from "./hooks/useFetch";


export function FeaturedProducts() {

  const { data: products, loading, error } = useFetch<Product[]>(fetchProducts);

    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Productos Destacados</h2>
            <p className="text-gray-600">Descubre nuestra selección de productos premium</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>
    );
  }