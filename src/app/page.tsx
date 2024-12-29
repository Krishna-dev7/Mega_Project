"use client"
import FeatureCategory from '@/components/customUi/Features';
import Hero from '@/components/customUi/Hero';
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

      {/* Featured Categories Section */}
      <FeatureCategory />

      {/* New arrivals section  */}
      <NewArrivals />

    </div>
  );
}
