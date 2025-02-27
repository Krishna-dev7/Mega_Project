"use client"
import React from "react";
import { ShoppingCart, Eye,ChevronRight } from "lucide-react";

// function NewArrivals({ products = [{
//   id: 1,
//   name: "Product 1",
//   price: "$100",
//   image: "https://dummyimage.com/400x400/000/fff"}, 
//    { id: 2, name: "Product 2", price: "$200", image: "https://dummyimage.com/400x400/000/fff" }, 
//    { id: 3, name: "Product 3", price: "$300", image: "https://dummyimage.com/400x400/000/fff" },
//    {id: 4, name: "Product 4", price: "$400", image: "https://dummyimage.com/400x400/000/fff"}] }) {
//   const handleViewDetails = (id: number) => {
//     window.location.href = `product-details.html?id=${id}`;
//   };

//   const handleAddToCart = (id: number) => {
//     console.log(`Adding product ${id} to cart`);
//   };

//   return (
//     <section className="py-16" aria-label="New Arrivals">
//       <h2 className="text-3xl font-semibold text-center mb-10">New Arrivals</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 md:px-10">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2"
//             >
//               {/* Product Image */}
//               <div className="h-64 overflow-hidden">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                 />
//               </div>

//               {/* Product Info */}
//               <div className="p-4 text-center">
//                 <h3 className="text-lg font-medium text-gray-800 mb-2">
//                   {product.name}
//                 </h3>
//                 <p className="text-gray-600 font-semibold mb-4">
//                   {product.price}
//                 </p>

//                 {/* Product Actions */}
//                 <div className="flex gap-4 justify-center">
//                   <button
//                     onClick={() => handleViewDetails(product.id)}
//                     className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
//                   >
//                     <Eye size={18} />
//                     View Details
//                   </button>
//                   <button
//                     onClick={() => handleAddToCart(product.id)}
//                     className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
//                   >
//                     <ShoppingCart size={18} />
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-700 text-lg">
//             No new arrivals available at the moment.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }


// export default NewArrivals;

function NewArrivals() {
  const products = [
    {
      name: 'The Classic Tote',
      price: '$1,299',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80'
    },
    {
      name: 'Signature Timepiece',
      price: '$2,499',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80'
    },
    {
      name: 'Heritage Boots',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80'
    },
    {
      name: 'Aviator Collection',
      price: '$459',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80'
    },
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <h2 className=" text-4xl text-white">New Arrivals</h2>
          <button className="flex items-center text-luxury-gold 
            hover:text-white transition-colors group">
            View Collection <ChevronRight size={20} className="ml-2 
            group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <div 
          className="grid grid-cols-1 md:grid-cols-2
           lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-[400px] object-cover transform 
                  group-hover:scale-105 transition duration-700"
                />
                <div 
                  className="absolute inset-0 bg-black/40 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6
                     transform translate-y-full group-hover:translate-y-0 
                     transition-transform duration-300">
                    <button className="w-full bg-luxury-gold text-black 
                      py-3 font-semibold tracking-wider hover:bg-white 
                      transition-colors">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-display text-white text-lg">
                  {product.name}
                </h3>
                <p className="text-luxury-gold mt-1">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default NewArrivals;