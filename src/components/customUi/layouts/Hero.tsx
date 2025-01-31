// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Router, ShoppingBagIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function Hero() {

  const router = useRouter()
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        Be Unstoppable
        </div>
        <div className="font-extra-light text-base md:text-4xl dark:text-neutral-200 py-4">
        Explore Fashion That Matches Your Vibe!
        </div>
        <Button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 cursor-pointer"
          onClick={() => router.push("/products")}>
          Shop now <ShoppingBagIcon />
        </Button>
      </motion.div>
    </AuroraBackground>
  );
}
// function Hero() {
//   return (
//     <section className="relative h-screen">
//       <div className="absolute inset-0">
//         <img 
//           src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80"
//           alt="Luxury Fashion"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 hero-gradient"></div>
//       </div>
//       <div className="relative h-full container mx-auto px-6 flex items-center">
//         <div className="max-w-2xl space-y-8 fade-in">
//           <h2 className="font-display text-7xl font-bold text-white leading-tight">Timeless Elegance, Modern Spirit</h2>
//           <p className="text-gray-300 text-lg font-light max-w-xl">Discover our curated collection of luxury fashion pieces that define contemporary sophistication.</p>
//           <button className="bg-luxury-gold text-black px-12 py-4 rounded-none font-semibold hover:bg-white transition-colors tracking-wider">
//             EXPLORE COLLECTION
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
export default Hero;
