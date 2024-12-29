import React from "react";
import { Button } from "../ui/button";
import { IProduct } from "@/models/product.models";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "../ui/card";
import conf from "@/helpers/conf";
import BadgeComponent from "./Badge";

type Props = {
  product: IProduct;
  className?: string;
};

const ProductItem: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const placeholderImage = "https://via.placeholder.com/300x200";

  return (
    <Card
      onClick={() =>
        router.push(`${conf.url}/products/${product._id?.toString()}`)
      }
      className={`rounded-lg p-4 sm:p-2 bg-gray-800 hover:shadow-cyan-300 
      hover:shadow-md overflow-hidden cursor-pointer shadow-sm 
      ${className} sm:w-[14rem] sm:h-[20rem] md:w-[18rem] md:h-[24rem] 
      lg:w-[20rem] lg:h-[24rem] w-full h-auto
      dark:hover:shadow-orange-500`}
    >
      <CardHeader className="p-0 items-center">
        <div className="relative w-64 h-48 sm:h-40 md:h-48 lg:h-60">
          <img
            src={product.images[0]?.url || placeholderImage}
            alt={product.description || "Product Image"}
            className="w-full h-full object-cover rounded-md object-center"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col lg:py-5 mt-1 justify-between p-4">
        <p className="text-xl my-2 font-bold inline-block text-gray-100">
          ${product.price}
          <span className="px-3">
            <BadgeComponent category={product.category}>
              {product.category}
            </BadgeComponent>
          </span>
        </p>
        <div className="text-center sm:mt-1 lg:mt-3">
          <Link href={`${conf.url}/api/products/${product._id?.toString()}`} passHref>
            <Button className="w-full text-sm md:py-3 sm-py-1 lg:py-3  text-gray-900 border-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-transparent transition-colors duration-300 hover:text-black ">
              Buy Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
