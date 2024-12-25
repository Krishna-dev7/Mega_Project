"use client"
import FeatureCategory from '@/components/customUi/Features';
import Hero from '@/components/customUi/Hero';
import NewArrivals from '@/components/customUi/NewArrivals';

export default function Home() {

  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white">

      {/* Featured Products Section */}
      <Hero />

      {/* Featured Categories Section */}
      <FeatureCategory />

      {/* New arrivals section  */}
      <NewArrivals />

    </div>
  );
}
