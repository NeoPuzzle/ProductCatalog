"use client";

import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const ProductCard = dynamic(() => import("./ProductCard"), { ssr: false });

export function FeaturedProducts({ onProductClick }: { onProductClick: (id: string) => void }) {
  const { data: products, isLoading, error } = useProducts();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const [sliderRef] = useKeenSlider(
    isMobile
      ? {
          loop: true,
          slides: { perView: 1.2, spacing: 10 },
        }
      : undefined
  );

  const productGrid = useMemo(() => {
    if (!products) return null;

    return isMobile ? (
      <div ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <div key={product.id} className="keen-slider__slide cursor-pointer" onClick={() => onProductClick(product.id)}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="cursor-pointer" onClick={() => onProductClick(product.id)}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  }, [products, isMobile, sliderRef, onProductClick]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Productos Destacados</h2>
          <p className="text-gray-600">Descubre nuestra selección de productos premium</p>
        </div>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500">Error al cargar productos. Por favor, intenta nuevamente.</div>
        ) : (
          productGrid
        )}

        <div className="text-center mt-10">
          <a href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
            Ver Todos los Productos
          </a>
        </div>
      </div>
    </section>
  );
}