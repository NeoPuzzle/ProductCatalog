"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Descubre productos de última tecnología
            </h1>
            <p className="text-xl mb-6">
              Explora nuestra colección de productos premium con los mejores
              precios del mercado.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/categories"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition"
              >
                Ver Categorías
              </Link>
              <Link
                href="/offers"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition"
              >
                Ofertas Especiales
              </Link>
            </div>
          </div>
          <div className="relative w-full h-96">
            <Image
              src="/images/latest_products.jpg"
              alt="Latest Products"
              fill
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
