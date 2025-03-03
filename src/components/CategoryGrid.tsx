"use client";

import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/loading";
import { useCategories } from "./hooks/useCategories";

export function CategoryGrid() {
  const { data: categories, isLoading, error } = useCategories();

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Categorías Populares</h2>
          <p className="text-gray-600">
            Explora nuestras categorías más buscadas
          </p>
        </div>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500">
            Error al cargar productos. Por favor, intenta nuevamente.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${encodeURIComponent(category.slug)}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105">
                  <div className="relative h-40">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}