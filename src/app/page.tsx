import Link from 'next/link';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { CategoryGrid } from '@/components/CategoryGrid';
import { HeroSection } from '@/components/HeroSection';
import { NewArrivals } from '@/components/NewArrivals';
import { Brands } from '@/components/Brands';
import { Newsletter } from '@/components/Newsletter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <NewArrivals />
       <Brands />
      <Newsletter />
      <Footer />
    </main>
  );
}