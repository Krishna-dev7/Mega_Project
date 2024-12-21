"use client"
import React from "react";
import { ShoppingCart, Eye } from "lucide-react";

function NewArrivals({ products = [{
  id: 1,
  name: "Product 1",
  price: "$100",
  image: "https://dummyimage.com/400x400/000/fff"}, 
   { id: 2, name: "Product 2", price: "$200", image: "https://dummyimage.com/400x400/000/fff" }, 
   { id: 3, name: "Product 3", price: "$300", image: "https://dummyimage.com/400x400/000/fff" },
   {id: 4, name: "Product 4", price: "$400", image: "https://dummyimage.com/400x400/000/fff"}] }) {
  const handleViewDetails = (id: number) => {
    window.location.href = `product-details.html?id=${id}`;
  };

  const handleAddToCart = (id: number) => {
    console.log(`Adding product ${id} to cart`);
  };

  return (
    <section className="py-16 bg-gray-50" aria-label="New Arrivals">
      <h2 className="text-3xl font-semibold text-center mb-10">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 md:px-10">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 font-semibold mb-4">
                  {product.price}
                </p>

                {/* Product Actions */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleViewDetails(product.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
                  >
                    <Eye size={18} />
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 text-lg">
            No new arrivals available at the moment.
          </p>
        )}
      </div>
    </section>
  );
}

export default NewArrivals;
