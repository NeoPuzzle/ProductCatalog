'use client';

import Image from "next/image";
import Link from "next/link";
import { useFetch } from "./hooks/useFetch";
import { fetchCategories } from "@/services/apiService";
import { Category } from "@/types/product";

export function CategoryGrid() {
  const { data: categories, loading, error } = useFetch<Category[]>(fetchCategories);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>Error al cargar categorías</p>;

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Categorías Populares</h2>
          <p className="text-gray-600">Explora nuestras categorías más buscadas</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105">
                <div className="relative h-40">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
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
      </div>
    </section>
  );
}