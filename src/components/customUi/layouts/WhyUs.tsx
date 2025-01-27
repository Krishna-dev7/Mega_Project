"use client"

import { motion } from "framer-motion"
import { Shield, Truck, RefreshCw } from "lucide-react"

const benefits = [
  { icon: Shield, title: "Secure Payments", description: "Your transactions are always safe" },
  { icon: Truck, title: "Free Shipping", description: "On orders over $100" },
  { icon: RefreshCw, title: "Easy Returns", description: "30-day return policy" },
]

export default function Benefits() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <benefit.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}