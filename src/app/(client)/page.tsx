"use client"
import FeatureCategory 
  from '@/components/customUi/layouts/Features';
import HeroComponent from '@/components/customUi/layouts/Hero';
import NewArrivals from '@/components/customUi/layouts/NewArrivals';
import BenefitComponent from '@/components/customUi/layouts/WhyUs';
import BrandComponent 
  from '@/components/customUi/layouts/BrandCollaboration';
import { Suspense } from 'react';
import Loading from '@/components/customUi/misc/Loading';

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