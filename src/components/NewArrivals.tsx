"use client";

import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useNewArrivals } from "./hooks/useNewArrivals";

const ProductCard = dynamic(() => import("./ProductCard"), { ssr: false });

export function NewArrivals({ onProductClick }: { onProductClick: (id: string) => void }) {
  const { data: newProducts, isLoading, error } = useNewArrivals();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: { perView: 1.2, spacing: 10 },
  });

  const handleProductClick = useCallback((id: string) => {
    onProductClick(id);
  }, [onProductClick]);

  const productGrid = useMemo(() => {
    if (!newProducts) return null;

    return isMobile ? (
      <div ref={sliderRef} className="keen-slider">
        {newProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="keen-slider__slide cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
            role="button"
            tabIndex={0}
            aria-label={`Ver detalles de ${product.name}`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
            role="button"
            tabIndex={0}
            aria-label={`Ver detalles de ${product.name}`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  }, [newProducts, isMobile, sliderRef, handleProductClick]);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Nuevos Lanzamientos</h2>
          <p className="text-gray-900">Los últimos productos que acaban de llegar</p>
        </div>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500">
            Error al cargar productos. Por favor, intenta nuevamente.
          </div>
        ) : (
          productGrid
        )}
      </div>
    </section>
  );
}