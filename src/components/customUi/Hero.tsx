import { Button } from "@/components/ui/button";
import React from "react";

const Hero: React.FC<any> = () => {
  return (
    <section className="relative flex h-screen items-center justify-center text-center text-white bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('')",
      }}>
      <div className="z-10 max-w-2xl px-6">
        <h2 className="text-5xl font-bold mb-4 drop-shadow-md">New Season Collection</h2>
        <p className="text-lg mb-6 drop-shadow-sm">
          Discover our latest arrivals in luxury fashion
        </p>
        <Button asChild variant="default" size="lg">
          <a href="#shop">Shop Now</a>
        </Button>
      </div>
    </section>
  );
}

export default Hero;
