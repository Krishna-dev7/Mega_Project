"use client"
import FeatureCategory 
  from '@/components/customUI/layouts/Features';
import HeroComponent from '@/components/customUI/layouts/Hero';
import NewArrivals from '@/components/customUI/layouts/NewArrivals';
import BenefitComponent from '@/components/customUI/layouts/WhyUs';
import BrandComponent 
  from '@/components/customUI/layouts/BrandCollaboration';
import { Suspense } from 'react';
import Loading from '@/components/customUI/misc/Loading';

function Home() {

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

const HomeWrapper:React.FC = () => (
  <Suspense 
    fallback={<div 
      className='w-full min-h-screen flex justify-center 
      items-center'>
        <Loading />
      </div>}>
    <Home />
  </Suspense>
)

export default HomeWrapper