import React from "react";
import { IProduct } from "@/models/product.models";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import conf from "@/helpers/conf";
import BadgeComponent from "@/components/customUI/product/Badge";
import { useAppDispatch } from "@/store/store";
import { selectProduct } from "@/store/productSlice";

type Props = {
  product: IProduct;
  className?: string;
};

const ProductItem: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const placeholderImage = "https://via.placeholder.com/300x200";
  const dispatch = useAppDispatch();
  
  return (
    <Card
      onClick={() =>{
        router.push(`${conf.url}/products/${product._id?.toString()}`)
        dispatch(selectProduct(product._id))
      }}
      className={`rounded-lg p-4 sm:p-2 bg-gray-800
      hover:shadow-md overflow-hidden cursor-pointer shadow-sm 
      ${className} sm:w-[12rem] sm:h-[18rem] md:w-[18rem] md:h-[24rem] 
      lg:w-[20rem] lg:h-[30rem] w-full h-auto
      dark:hover:border-slate-600`}
    >
      <CardHeader className="p-0 items-center">
        <div className="relative w-full h-96 sm:h-72 md:h-96">
          <img
            src={product.images[0]?.url || placeholderImage}
            alt={product.description || "Product Image"}
            className="w-full h-full object-cover rounded-md object-center"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-row text-sm lg:py-2 mt-5 items-start justify-between py-2 p-4">
       
        <p className="text-lg flex  font-bold dark:text-gray-100">
            ${product.price}
            <span className="px-3">
              <BadgeComponent category={product.category}>
                {product.category}
              </BadgeComponent>
            </span>
          </p>
          <h2 className="dark:text-white text-ellipsis overflow-hidden  text-sm line-clamp-1 " >{product.slug}</h2>
        {/* <div className="text-center">
          <Link href={`${conf.url}/api/products/${product._id?.toString()}`} passHref>
            <Button className="w-full text-sm md:py-3 border-none sm-py-1 lg:py-3 bg-yellow-500
              text-black dark:text-gray-900 dark:bg-gradient-to-r dark:from-orange-400 dark:to-orange-600 hover:bg-yellow-500
               transition-colors duration-300 ">
              Buy Now
            </Button>
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default ProductItem;
