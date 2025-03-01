"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/categories/electronica"
              className="hover:text-blue-400 transition"
            >
              Electronica
            </Link>
            <Link
              href="/categories/hogar"
              className="hover:text-blue-400 transition"
            >
              Hogar
            </Link>
            <Link
              href="/categories/deportes"
              className="hover:text-blue-400 transition"
            >
              Deportes
            </Link>
            <Link
              href="/categories/moda"
              className="hover:text-blue-400 transition"
            >
              Moda
            </Link>
            <Link
              href="/categories/juguetes"
              className="hover:text-blue-400 transition"
            >
              Juguetes
            </Link>
            <Link href="/offers" className="hover:text-blue-400 transition">
              Ofertas
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Link href="/account" className="hover:text-blue-400 transition">
              <User className="h-6 w-6" />
            </Link>
            <Link
              href="/cart"
              className="relative hover:text-blue-400 transition"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-gray-800 w-full text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/categories/electronica"
                className="hover:text-blue-400 transition"
              >
                Electronica
              </Link>
              <Link
                href="/categories/hogar"
                className="hover:text-blue-400 transition"
              >
                Hogar
              </Link>
              <Link
                href="/categories/deportes"
                className="hover:text-blue-400 transition"
              >
                Deportes
              </Link>
              <Link
                href="/categories/moda"
                className="hover:text-blue-400 transition"
              >
                Moda
              </Link>
              <Link
                href="/categories/juguetes"
                className="hover:text-blue-400 transition"
              >
                Juguetes
              </Link>
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