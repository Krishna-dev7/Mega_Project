"use client"
import FeatureCategory from '@/components/customUi/layouts/Features';
import Hero from '@/components/customUi/layouts/Hero';
import Moto from '@/components/customUi/Moto';
import NewArrivals from '@/components/customUi/layouts/NewArrivals';
import { useEffect } from 'react';
import BenefitComponent from '@/components/customUi/layouts/WhyUs';
import BrandComponent from '@/components/customUi/layouts/BrandCollaboration';
import AboutUs from '@/components/customUi/layouts/AboutUs';


export default function Home() {

  return (
    <div className=" scroll-smooth min-h-screen text-white">

      {/* Featured Products Section */}
      <Hero />
      <FeatureCategory />
      <NewArrivals />
      <BenefitComponent />
      <BrandComponent />
      {/* <AboutUs/> */}
    </div>
  );
}
