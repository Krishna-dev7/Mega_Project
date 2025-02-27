"use client"
import FeatureCategory 
  from '@/components/customUI/layouts/Features';
import HeroComponent from '@/components/customUI/layouts/Hero';
import NewArrivals from '@/components/customUI/layouts/NewArrivals';
import BenefitComponent from '@/components/customUI/layouts/WhyUs';
import BrandComponent 
  from '@/components/customUI/layouts/BrandCollaboration';

export default function Home() {

  return (
    <div className=" scroll-smooth min-h-screen text-white">
      <HeroComponent />
      <FeatureCategory />
      <NewArrivals />
      <BenefitComponent />
      <BrandComponent />
    </div>
  );
}
