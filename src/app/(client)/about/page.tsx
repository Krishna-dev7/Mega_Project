"use client";

import { ArrowRight, ShoppingBag, Users, Globe, Award, TrendingUp, Star, Shield, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen w-full flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070"
            alt="Luxury Fashion"
            fill
            className="object-cover scale-110 animate-[ken-burns_20s_ease-in-out_infinite_alternate]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-zinc-900/80 to-zinc-900"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-7xl font-bold leading-tight animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out">
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Redefining Luxury
              </span>
            </h1>
            <p className="text-2xl text-zinc-300 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out">
              Since 1970, we've been crafting experiences that transcend ordinary commerce, delivering excellence in every detail.
            </p>
            <div className="flex gap-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-500 ease-out">
              <button className="group bg-white text-zinc-900 px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 transition-all flex items-center gap-3">
                Discover Our Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent"></div>
      </div>

      {/* Brand Pillars */}
      <div className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Star,
                title: "Unmatched Quality",
                description: "Every piece we create embodies perfection, crafted with meticulous attention to detail.",
              },
              {
                icon: Shield,
                title: "Timeless Heritage",
                description: "Five decades of excellence, setting the standard in luxury retail worldwide.",
              },
              {
                icon: Sparkles,
                title: "Innovation First",
                description: "Pushing boundaries to create experiences that define the future of luxury.",
              },
            ].map((pillar, index) => (
              <div
                key={index}
                className="group relative animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl blur-xl transition-opacity group-hover:opacity-100 opacity-0"></div>
                <div className="relative p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <pillar.icon className="w-12 h-12 mb-6 text-white" />
                  <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                  <p className="text-zinc-400 text-lg">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section with Parallax */}
      <div className="py-32 relative">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-900"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: ShoppingBag, stat: "250K+", label: "Products Curated" },
              { icon: Users, stat: "1M+", label: "Satisfied Clients" },
              { icon: Globe, stat: "50+", label: "Countries Served" },
              { icon: Award, stat: "100+", label: "Industry Awards" },
            ].map((item, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <item.icon className="w-12 h-12 mx-auto mb-6 text-white" />
                  <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    {item.stat}
                  </h3>
                  <p className="text-lg text-zinc-400">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll opacity-0 translate-x-8 transition-all duration-1000">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                A Legacy of Excellence
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                From our humble beginnings as a boutique atelier to our current position as a global luxury powerhouse, 
                our journey has been defined by an unwavering commitment to excellence and innovation.
              </p>
              <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
                Today, we continue to push the boundaries of what's possible in luxury retail, 
                creating experiences that resonate with discerning clients worldwide.
              </p>
              <button className="group flex items-center gap-3 bg-gradient-to-r from-white to-zinc-200 text-zinc-900 px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all">
                Explore Our Heritage
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative h-[600px] animate-on-scroll opacity-0 -translate-x-8 transition-all duration-1000">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070"
                  alt="Heritage"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}