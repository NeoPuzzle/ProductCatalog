"use client";

import { Brands } from "@/components/Brands";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";
import HeaderWrapper from "@/components/HeaderWrapper";
import { HeroSection } from "@/components/HeroSection";
import { NewArrivals } from "@/components/NewArrivals";
import { Newsletter } from "@/components/Newsletter";
import { useRouter } from "next/navigation";

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
