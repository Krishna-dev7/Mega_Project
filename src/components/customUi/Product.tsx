"use client"

import conf from '@/helpers/conf';
import {IProduct} from '@/models/product.models';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const ProductDetailPage = () => {

  const [image, setImg]
     = useState<string>("https://i.pinimg.com/736x/48/2d/d1/482dd1c72acfdd9859a7cdb35b5dc70f.jpg");

  const [products, setProducts] 
    = useState<Array<IProduct>>([])


  useEffect(() => {
    // fetch product from api
    axios
      .get(`${conf.url}/api/products`)
      .then( res => {
        console.log("Products: ", res);
        setProducts(prev => [...prev, ...res.data.data])
      })
      .catch( err => {
        console.log(err.message);
      })
    
  }, []);

  return (
    <div className="min-h-screen bg-[#e7e4c4] py-14 max-h-fit h-screen ">

      {/* Main Content */}
      <div className="container bg-[#e7e4c4] mx-auto flex gap-8">
        {/* Product Images */}
        <div className="flex-1">
          <div className="p-4 bg-[#e7e4c4] rounded-lg shadow">
            <img
              src={image}
              alt="Main Product"
              className="w-96 h-96 rounded-l-3xl"
            />
            <div className="flex mt-4 object-cover space-x-4">

                { products.length > 0 && products
                  .map((product: IProduct) => (
                    <img
                      key={product._id?.toString()}
                      src={product.images[0].url}
                      alt={product.slug}
                      onClick={() => setImg(product.images[0].url)}
                      className="w-20 h-20 rounded-lg cursor-pointer"
                    />
                  ))
                }

              {/* <img
                onClick={() => setImg("https://i.pinimg.com/736x/4b/dd/de/4bdddea313df938b2df1ee57a586214a.jpg")}
                src="https://i.pinimg.com/736x/4b/dd/de/4bdddea313df938b2df1ee57a586214a.jpg"
                alt="Thumbnail"
                className="w-20 h-20 rounded-lg cursor-pointer"
              /> */}
              {/* <img
                onClick={() => 
                  setImg("https://i.pinimg.com/236x/a6/b9/66/a6b966a3acdc46972ec67e2528d721db.jpg")}
                src="https://i.pinimg.com/236x/a6/b9/66/a6b966a3acdc46972ec67e2528d721db.jpg"
                alt="Thumbnail"
                className="w-20 h-20 rounded-lg cursor-pointer"
              />
              <img
              onClick={() => 
                setImg("https://i.pinimg.com/236x/73/15/15/73151521154828afd5e8174b66f76958.jpg")}
                src="https://i.pinimg.com/236x/73/15/15/73151521154828afd5e8174b66f76958.jpg"
                alt="Thumbnail"
                className="w-20 h-20 rounded-lg cursor-pointer"
              /> */}
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
      <div className="container mx-auto mt-8 p-4 bg-[#e7e4bb] rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold">Reviews</h3>
        <div className="mt-4">
          <div className="flex flex-col items-start gap-5 justify-between">
            <div>
              <h4 className="text-lg font-medium">Helen M.</h4>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
            <p className="text-md text-gray-700">
              Excellent running shoes. It turns very sharply on the foot.
            </p>
          </div>
        </div>
      </div>

      {/* <Description /> */}
    </div>
  );
};

export default ProductDetailPage;
