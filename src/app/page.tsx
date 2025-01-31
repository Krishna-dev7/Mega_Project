"use client"
import FeatureCategory from '@/components/customUi/layouts/Features';
import Hero from '@/components/customUi/layouts/Hero';
import Moto from '@/components/customUi/Moto';
import NewArrivals from '@/components/customUi/layouts/NewArrivals';
import { useEffect } from 'react';
import Benefits from '@/components/customUi/layouts/WhyUs';
import Brand from '@/components/customUi/layouts/BrandCollaboration';
import AboutUs from '@/components/customUi/layouts/AboutUs';


export default function Home() {

  return (
    <div className=" min-h-screen font-sans text-white">

      {/* Featured Products Section */}
      <Hero />
      {/* <HomeHero  /> */}
      {/* <Moto /> */}
      {/* Featured Categories Section */}
      <FeatureCategory />

      {/* New arrivals section  */}
      <NewArrivals />
      <Benefits />
      <Brand />
      {/* <AboutUs/> */}
    </div>
  );
}
