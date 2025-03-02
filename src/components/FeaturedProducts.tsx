'use client';

import { Product } from "@/types/product";
import { useFetch } from "./hooks/useFetch";
import { fetchProducts } from "@/services/apiService";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const ProductCard = dynamic(() => import("./ProductCard"), { ssr: false });

export function FeaturedProducts({ onProductClick }: { onProductClick: (id: string) => void }) {
  const { data: products, loading, error } = useFetch<Product[]>(fetchProducts);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.2, spacing: 10 },
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Productos Destacados</h2>
          <p className="text-gray-600">Descubre nuestra selección de productos premium</p>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500">
            Error al cargar productos. Por favor, intenta nuevamente.
          </div>
        ) : isMobile ? (
          /* Carrusel en Mobile */
          <div ref={sliderRef} className="keen-slider">
            {products?.map(product => (
              <div
                key={product.id}
                className="keen-slider__slide cursor-pointer"
                onClick={() => onProductClick(product.id)}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* Grid en Desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map(product => (
              <div
                key={product.id}
                onClick={() => onProductClick(product.id)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Ver Todos los Productos
          </a>
        </div>
      </div>
    </section>
  );
}