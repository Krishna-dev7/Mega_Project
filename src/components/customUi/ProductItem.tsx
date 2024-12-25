"use client";

import React from "react";
import { Button } from "../ui/button";
import { IProduct } from "@/models/product.models";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardHeader, 
  CardContent 
} from "../ui/card";
import conf from "@/helpers/conf";

type Props = {
  product: IProduct;
  className?: string;
};

const ProductItem: React.FC<Props> = ({ 
  product, 
  className 
}) => {

  const router = useRouter();
  const placeholderImage = "https://via.placeholder.com/300x200";

  return (
    <Card
      onClick={() => 
        router.push(`${conf.url}/products/${product._id?.toString()}`) }
      className={`rounded-lg p-4 hover:shadow-cyan-300 hover:shadow-md overflow-hidden cursor-pointer shadow-sm ${className} 
      sm:w-[14rem] sm:h-[20rem] md:w-[18rem] md:h-[24rem] lg:w-[22rem] lg:h-[28rem] w-full h-auto
      hover:border-cyan-600`}
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-48 sm:h-40 md:h-48 lg:h-60">
          <img
            src={product.images[0]?.url || placeholderImage}
            alt={product.description || "Product Image"}
            className="w-full h-full object-contain object-center"
          />
        </div>
      </CardHeader>
      <CardContent 
        className="flex flex-col lg:py-5 mt-2 justify-between p-4">
        <p className="text-xl my-5 font-bold ">
          ${product.price}
        </p>
        <p className="description text-sm text-gray-700 truncate mb-2">
          {product.description}
        </p>
        <div className="text-center lg:px-1 mt-3">
          <Link
            href={`${conf.url}/api/products/${product._id?.toString()}`}
            passHref
          >
            <Button className="w-full text-sm py-5">Buy Now</Button>
          </Link>
        </div>  
      </CardContent>
    </Card>
  );
};

export default ProductItem;
