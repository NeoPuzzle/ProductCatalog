"use client"

import { Suspense, useState } from "react";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HeroSection } from "@/components/HeroSection";
import { NewArrivals } from "@/components/NewArrivals";
import { Brands } from "@/components/Brands";
import { Newsletter } from "@/components/Newsletter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ProductModal from "./products/[id]/page";
import HeaderWrapper from "@/components/HeaderWrapper";

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProductModal = (productId: string) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <HeaderWrapper onProductClick={openProductModal} />
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts onProductClick={openProductModal} />
      <NewArrivals onProductClick={openProductModal} />
      
      <Brands />
      <Newsletter />
      <Footer />

      {isModalOpen && (
        <ProductModal
          productId={selectedProductId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}