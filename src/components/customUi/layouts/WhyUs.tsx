"use client"

import { motion } from "framer-motion"
import { Shield, Truck, Package,Headphones, Star} from "lucide-react"

// const benefits = [
//   { icon: Shield, title: "Secure Payments", description: "Your transactions are always safe" },
//   { icon: Truck, title: "Free Shipping", description: "On orders over $100" },
//   { icon: RefreshCw, title: "Easy Returns", description: "30-day return policy" },
// ]

export default function Benefits() {
  const services = [
    { icon: <Truck size={28} />, title: 'Complimentary Shipping', description: 'On all orders over $250' },
    { icon: <Package size={28} />, title: 'Hassle-Free Returns', description: '30-day return policy' },
    { icon: <Headphones size={28} />, title: 'Personal Styling', description: 'Expert consultation available' },
    { icon: <Star size={28} />, title: 'Authenticity Guaranteed', description: 'Certified genuine products' },
  ];

  return (
    <section className="py-24 bg-luxury-charcoal">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <div key={index} className="group flex flex-col items-center text-center p-8 border border-luxury-gold/20 hover:border-luxury-gold transition-colors duration-300">
              <div className="text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <h3 className="font-display text-white text-xl mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}