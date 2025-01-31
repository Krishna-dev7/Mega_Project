"use client"
import FeatureCategory from '@/components/customUi/layouts/Features';
import HeroSection from '@/components/customUi/layouts/Hero';
import Moto from '@/components/customUi/Moto';
import NewArrivals from '@/components/customUi/layouts/NewArrivals';
import { useEffect } from 'react';
import BenefitSection from '@/components/customUi/layouts/WhyUs';
import BrandSection from '@/components/customUi/layouts/BrandCollaboration';


export default function Home() {

  return (
    <div className=" min-h-screen font-sans text-white">
      <HeroSection />
      <FeatureCategory />
      <NewArrivals />
      <BenefitSection />
      <BrandSection />
    </div>
  );
}
