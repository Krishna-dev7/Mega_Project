"use client"
import FeatureCategory from '@/components/customUi/Features';
import Footer from '@/components/customUi/Footer';
import Header from '@/components/customUi/Header';
import Hero from '@/components/customUi/Hero';
import NewArrivals from '@/components/customUi/NewArrivals';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white">

      {/* Navbar */}
      <Header />

      {/* Featured Products Section */}
      <Hero />

      {/* Featured Categories Section */}
      <FeatureCategory />

      {/* New arrivals section  */}
      <NewArrivals />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
