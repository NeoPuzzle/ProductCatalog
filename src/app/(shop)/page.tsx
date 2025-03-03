"use client";

import { useRouter } from "next/navigation";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HeroSection } from "@/components/HeroSection";
import { NewArrivals } from "@/components/NewArrivals";
import { Brands } from "@/components/Brands";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import HeaderWrapper from "@/components/HeaderWrapper";

export default function Home() {
  const router = useRouter();

  const openProductPage = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <main className="min-h-screen">
      <HeaderWrapper onProductClick={openProductPage} />
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts onProductClick={openProductPage} />
      <NewArrivals onProductClick={openProductPage} />
      <Brands />
      <Newsletter />
      <Footer />
    </main>
  );
}
