"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { Search, User, Menu, X } from "lucide-react";
import { fetchProducts } from "@/services/apiService";
import { Product } from "@/types/product";
import Loading from "@/app/loading";
import { useFetch } from "./hooks/useFetch";
import { useSearch } from "./hooks/useSearch";
import { CartIcon } from "./CartIcon";
import { useCategories } from "./hooks/useCategories";

export function Header({ onProductClick }: { onProductClick: (id: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: categories = [], isLoading, error } = useCategories();
  const { data: products = [] } = useFetch(fetchProducts);
  const { query, setQuery, filteredData } = useSearch<Product>(products, "name");

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [setQuery]
  );

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y menú hamburguesa */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="text-2xl font-bold">
              JackStore
            </Link>
          </div>

          {/* Iconos de cuenta y carrito (siempre visibles) */}
          <div className="flex items-center space-x-4">
            <Link href="/account" className="hover:text-blue-400 transition" aria-label="Cuenta">
              <User className="h-6 w-6" />
            </Link>
            <CartIcon />
          </div>
        </div>

        {/* Menú desplegable (móvil) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {/* Campo de búsqueda dentro del menú */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                aria-label="Buscar productos"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {query && (
                <div className="absolute top-12 left-0 bg-white text-black p-4 rounded-lg shadow-lg w-full z-10" aria-live="polite">
                  {filteredData.length > 0 ? (
                    filteredData.map((product) => (
                      <button
                        key={product.id}
                        className="block py-2 hover:bg-gray-100 w-full text-left"
                        onClick={() => onProductClick(product.id)}
                      >
                        {product.name}
                      </button>
                    ))
                  ) : (
                    <p>No se encontraron resultados</p>
                  )}
                </div>
              )}
            </div>

            {/* Categorías y otros enlaces */}
            <nav className="flex flex-col space-y-3">
              {isLoading ? (
                <Loading />
              ) : error ? (
                <span className="text-red-500">Error al cargar categorías</span>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${encodeURIComponent(category.slug)}`}
                    className="hover:text-blue-400 transition"
                  >
                    {category.name}
                  </Link>
                ))
              )}
              <Link href="/offers" className="hover:text-blue-400 transition">
                Ofertas
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}