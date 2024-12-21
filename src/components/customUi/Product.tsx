import Description from './Description';
import React from 'react';

const ProductDetailPage = () => {
  return (
    <div className="min-h-screen bg-[#e7e4c4] max-h-fit h-fit ">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-[#e7e4c4] shadow">
        <h1 className="text-2xl font-bold">BR.F</h1>
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border rounded-lg focus:outline-none"
        />
        <div className="flex items-center space-x-4">
          <button className="font-medium">Cart</button>
          <button className="font-medium">Favorites</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto mt-8 flex gap-8">
        {/* Product Images */}
        <div className="flex-1">
          <div className="p-4 bg-[#e7e4c4] rounded-lg shadow">
            <img
              src="/shoe-main.jpg"
              alt="Main Product"
              className="w-full h-auto rounded-lg"
            />
            <div className="flex mt-4 space-x-4">
              <img
                src="/shoe-thumb1.jpg"
                alt="Thumbnail"
                className="w-20 h-20 rounded-lg cursor-pointer"
              />
              <img
                src="/shoe-thumb2.jpg"
                alt="Thumbnail"
                className="w-20 h-20 rounded-lg cursor-pointer"
              />
              <img
                src="/shoe-thumb3.jpg"
                alt="Thumbnail"
                className="w-20 h-20 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="p-4 bg-[#e7e4c4] rounded-lg shadow">
            <h2 className="text-2xl font-bold">Shoes Reebok Zig Kinetica 3</h2>
            <p className="mt-2 text-sm text-gray-500">42 reviews</p>
            <p className="mt-4 text-3xl font-bold">$199.00</p>

            <div className="mt-6">
              <h3 className="mb-2 text-lg font-medium">Color</h3>
              <div className="flex space-x-4">
                <button className="w-8 h-8 rounded-full border border-gray-300"></button>
                <button className="w-8 h-8 rounded-full border border-gray-300"></button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 text-lg font-medium">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                <button className="px-4 py-2 border rounded-lg">40</button>
                <button className="px-4 py-2 border rounded-lg">41</button>
                <button className="px-4 py-2 border rounded-lg">42</button>
              </div>
            </div>

            <button className="w-full px-4 py-2 mt-6 text-white bg-black rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {/* <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow">
        <h3 className="text-2xl font-bold">Reviews</h3>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium">Helen M.</h4>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
            <p className="text-sm text-gray-700">Excellent running shoes. It turns very sharply on the foot.</p>
          </div>
        </div>
      </div> */}

      <Description />
    </div>
  );
};

export default ProductDetailPage;
