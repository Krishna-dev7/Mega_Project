"use client"
import FeatureCategory from '@/components/customUi/Features';
import Hero from '@/components/customUi/Hero';
import Moto from '@/components/customUi/Moto';
import NewArrivals from '@/components/customUi/NewArrivals';


export default function Home() {

  // useEffect(() => {
  //   seedProducts();
  // }, [])

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
