"use client";

import { Product } from "@/types/product";
import { fetchNewProducts } from "@/services/apiService";
import { useFetch } from "./hooks/useFetch";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const ProductCard = dynamic(() => import("./ProductCard"), { ssr: false });

export function NewArrivals({ onProductClick }: { onProductClick: (id: string) => void }) {
  const { data: newProducts, loading, error } = useFetch<Product[]>(fetchNewProducts);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en mobile
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Configuración del carrusel
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: { perView: 1.2, spacing: 10 },
  });

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Nuevos Lanzamientos</h2>
          <p className="text-gray-900">Los últimos productos que acaban de llegar</p>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500">Error al cargar productos. Por favor, intenta nuevamente.</div>
        ) : (
          <>
            {isMobile ? (
              <div ref={sliderRef} className="keen-slider">
                {newProducts?.map((product) => (
                  <div key={product.id} onClick={() => onProductClick(product.id)} className="keen-slider__slide">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {newProducts?.map((product) => (
                  <div key={product.id} onClick={() => onProductClick(product.id)} className="cursor-pointer">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}