import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-semibold mb-4 text-gold">Welcome to Luxury Store</h1>
          <p className="text-xl mb-6 text-gray-300">Discover the finest luxury items, curated just for you.</p>
          <Button className="bg-gold text-gray-900 px-6 py-3 rounded-full shadow-lg text-lg hover:bg-gray-800">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gold">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Product Card 1 */}
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden group hover:scale-105 transform transition duration-300">
            <img src="https://via.placeholder.com/500" alt="Product 1" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-gold">Luxury Watch</h3>
              <p className="text-gray-400 mb-4">Elegant design with Swiss craftsmanship.</p>
              <span className="text-xl font-bold text-white">$2500</span>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden group hover:scale-105 transform transition duration-300">
            <img src="https://via.placeholder.com/500" alt="Product 2" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-gold">Leather Bag</h3>
              <p className="text-gray-400 mb-4">Premium leather for a timeless look.</p>
              <span className="text-xl font-bold text-white">$1800</span>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden group hover:scale-105 transform transition duration-300">
            <img src="https://via.placeholder.com/500" alt="Product 3" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-gold">Designer Shoes</h3>
              <p className="text-gray-400 mb-4">Exquisite craftsmanship and high-quality materials.</p>
              <span className="text-xl font-bold text-white">$1200</span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Luxury Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
