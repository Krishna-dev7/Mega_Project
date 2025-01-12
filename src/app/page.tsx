"use client"
import FeatureCategory from '@/components/customUi/layouts/Features';
import Hero from '@/components/customUi/layouts/Hero';
import Moto from '@/components/customUi/Moto';
import NewArrivals from '@/components/customUi/NewArrivals';
import { useEffect } from 'react';


export default function Home() {

  return (
    <div className=" min-h-screen font-sans text-white">

      {/* Featured Products Section */}
      <Hero />
      {/* <HomeHero  /> */}

      <Moto />

      {/* Featured Categories Section */}
      <FeatureCategory />

      {/* New arrivals section  */}
      <NewArrivals />

    </div>
  );
}
