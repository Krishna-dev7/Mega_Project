import { Shield, Truck, Package,Headphones,ChevronRight, Star} from "lucide-react"
function FeatureCategory({ categories = [{
  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  alt: "Fashion",
  name: "Fashion",
  description: "Curated Collections"
},{
  image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt: "Shirts",
  name: "Shirts",
  description: "Refined Essentials"
},{
  image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGphY2tldHN8ZW58MHx8MHx8fDA%3D",
  alt: "Jackets",
  name: "Jackets",
  description: "Statement Pieces"
}] }) {
  return (
    <section className="py-32 bg-black" aria-label="Featured Categories">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-luxury-gold text-sm tracking-[0.3em] uppercase mb-4 block">Discover</span>
          <h2 className="font-display text-5xl text-white mb-6">
            Shop By Category
          </h2>
          <div className="w-24 h-[1px] bg-luxury-gold mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative overflow-hidden group cursor-pointer"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={category.image}
                  alt={category.alt}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-3xl text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-luxury-gold text-sm tracking-wider mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {category.description}
                    </p>
                    <div className="flex items-center text-white text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <span className="mr-2">Explore Collection</span>
                      <ChevronRight className="text-luxury-gold" size={16} />
                    </div>
                  </div>
                </div>

                {/* Border Overlay */}
                <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/20 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureCategory;