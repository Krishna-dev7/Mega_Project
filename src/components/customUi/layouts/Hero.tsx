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
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
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

export default Hero;
