"use client"

import React from "react"

const Brand: React.FC = () => {
  const brands = [
    'AMAZON', 'FLIPKART', 'MYNTRA', 'AJIO', 'TATACLIQ', 'KOOVS', 'SHOPPERS STOP', 'FASHIOMOVA', 'LIMEROAD', 'CLOVIA', 'ZARA', 'H&M', 'SHEIN (India)', 'BENGALURU FASHION', 'MISHO'
  ];
  

  return (
    <div className="py-16 bg-transparent border-b border-luxury-gold/20 overflow-hidden">
      <div className="flex space-x-24 animate-marquee whitespace-nowrap">
        {[...brands, ...brands,...brands].map((brand, index) => (
          <span key={index} className="text-2xl font-display text-palegoldenrod mx-8">{brand}</span>
        ))}
      </div>
    </div>
  );
}

export default Brand;