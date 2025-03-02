"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import debounce from "lodash.debounce";
import { fetchCategories, fetchProducts } from "@/services/apiService";
import { Category, Product } from "@/types/product";
import Loading from "@/app/loading";
import { useFetch } from "./hooks/useFetch";
import { useSearch } from "./hooks/useSearch";
import { useGlobalState } from "@/context/GlobalStateProvider";
import { CartIcon } from "./CartIcon";

export function Header({ onProductClick }: { onProductClick: (id: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    data: categories,
    loading,
    error,
  } = useFetch<Category[]>(fetchCategories);
  const { data: products = [] } = useFetch(fetchProducts);
  const { query, setQuery, filteredData } = useSearch<Product>(
    products,
    "name"
  );
  const { cart } = useGlobalState();

  const handleSearch = debounce((value: string) => {
    setQuery(value);
  }, 300);

  // const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Link href="/" className="text-2xl font-bold">
              JackStore
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {loading ? (
              // <Loading />
              ""
            ) : error ? (
              <span className="text-red-500">Error al cargar categorías</span>
            ) : (
              categories?.map((category) => (
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

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

              {query && (
                <div className="absolute top-12 left-0 bg-white text-black p-4 rounded-lg shadow-lg w-64">
                  {filteredData.length > 0 ? (
                    filteredData.map((product) => (
                      <Link
                        key={product.id}
                        href={`/`}
                        className="block py-2 hover:bg-gray-100"
                        onClick={() => onProductClick(product.id)} 
                      >
                        {product.name}
                      </Link>
                    ))
                  ) : (
                    <p>No se encontraron resultados</p>
                  )}
                </div>
              )}
            </div>

            <Link href="/account" className="hover:text-blue-400 transition">
              <User className="h-6 w-6" />
            </Link>
            <CartIcon />
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-gray-800 w-full text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {query && (
              <div className="absolute top-20 right-0 bg-white text-black p-4 rounded-lg shadow-lg w-64">
                {filteredData.length > 0 ? (
                  filteredData.map((product) => (
                    <Link
                      key={product.id}
                      href={`/`}
                      className="block py-2 hover:bg-gray-100"
                    >
                      {product.name}
                    </Link>
                  ))
                ) : (
                  <p>No se encontraron resultados</p>
                )}
              </div>
            )}
            <nav className="flex flex-col space-y-3">
              {loading ? (
                <Loading />
              ) : error ? (
                <span className="text-red-500">Error al cargar categorías</span>
              ) : (
                categories?.map((category) => (
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
