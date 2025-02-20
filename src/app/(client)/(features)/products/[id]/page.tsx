"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import conf from "@/helpers/conf";
import { IProduct } from "@/models/product.models";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import BadgeComponent from "@/components/customUI/product/Badge";
import { UserSchema } from "@/models/user.models";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ShinyButton from "@/components/ui/shiny-button";
import Review from "@/components/customUI/product/Review";
import Description from "@/components/customUI/product/Description";
import cartService from "@/services/CartService";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/store";
import { setCart } from "@/store/cartSlice";


type customType = {
  owner: UserSchema
}

type ProductType = IProduct & customType | null;

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<ProductType>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { id } = useParams();
  const session = useSession();
  const {toast} = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get(`${conf.url}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);

        if (res.data.data.images[0]) {
          setActiveImage(res.data.data.images[0].url);
        }
      })
      .catch((err) => {
        console.log("error in product: ", err.message);
      });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('image-scroll');
    if (!container) return;

    const scrollAmount = 100;
    const newPosition = direction === 'left'
      ? scrollPosition - scrollAmount
      : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });

    setScrollPosition(newPosition);
  };

  const createCart = async () => {
    if (session && session.status == "unauthenticated") {
      return toast({
        title: "Unauthenticated 😡",
        description: "Signin before adding Cart"
      });
    }
  
    if (session.data?.user._id && product?._id) {
      const cart = await cartService.createCart({
        userId: session.data?.user._id,
        productId: product?._id.toString()
      });

      console.log("Cart 😄", cart);
      if (cart) {
        dispatch(setCart(cart));
        toast({
          title: "Cart 😄",
          description: "Cart added successfully"
        })
      }
    }
  };

  return (
    product && <div className="min-h-screen dark:bg-[#121212] px-1 pt-24">
      <div
        
        className="max-w-7xl sm:text-sm text-xs sm:border dark:border-gray-400 border-black rounded-lg shadow-md
         mx-auto px-4 sm:px-6 lg:px-8">


        <div className="  overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2 p-6 space-y-6">
              {/* Main Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden ">
                <img
                  src={activeImage || product?.images[0]?.url}
                  alt={product?.description || "Product"}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              </div>

              {/* Thumbnail Navigation */}
              <div className="relative">
                <button
                  onClick={() => scroll('left')}
                  className="absolute border border-black left-0 top-1/2 -translate-y-1/2
                  rounded-full p-1 shadow-md hover:bg-white transition-colors z-10"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <div
                  id="image-scroll"
                  className="flex gap-4 mx-2 my-2 py-4 overflow-hidden scroll-smooth px-8"
                >
                  {product?.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(image.url)}
                      className={`flex-shrink-0 sm:w-20 sm:h-20 w-14 h-14 rounded-lg
                       overflow-hidden transition-all duration-200 ${activeImage === image.url
                          ? 'ring-2 ring-gray-300'
                          : ''
                        }`}
                    >
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => scroll('right')}
                  className="absolute border border-black right-0 top-1/2 -translate-y-1/2
                  rounded-full p-1 shadow-md hover:bg-white transition-colors z-10" >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="lg:w-3/4 p-6 lg:p-8 ">
              <div className="space-y-6  sm:px-10 ">
                <div className="space-y-2">
                  <h1 className="sm:text-2xl text-lg  mb-4" >
                    <span className="uppercase mb-4 block" >{product.slug}</span>
                    ${product?.price}
                  </h1>
                  <BadgeComponent
                    className="mb-10"
                    category={product?.category}>
                    {product?.category}
                  </BadgeComponent>

                  <div className="flex items-center gap-5" >
                    <p className="flex items-center  " >
                      {(new Array(5)).fill(0).map((item, idx) => (
                        <Star
                          className=" dark:text-gray-400 text-black my-3"
                          key={idx}
                          fill={idx < (product?.rating ?? 0) ? "black" : "transparent"}
                          size={14} />
                      ))}
                    </p>

                    <div className="profile flex border-l border-yellow-400 px-5 items-center gap-1" >
                      <Avatar>
                        <AvatarImage
                          className="w-6 h-6 rounded-full"
                          src={product.owner?.avatar
                            || "https://i.pinimg.com/736x/7d/9f/7b/7d9f7b3a201aa53213edad9e56b7fb1e.jpg"} />
                        <AvatarFallback about="av" />
                      </Avatar>

                      <span>{product.owner?.username || "Random"}</span>
                    </div>
                  </div>
                </div>


                <p className="dark:text-gray-400 text-black text-ellipsis line-clamp-3 leading-relaxed">
                  {product?.description}
                </p>
                        
               <div className="flex gap-3">
                <ShinyButton >
                  <span  className="text-[.6rem] text-yellow-400 ">Purchase</span>
                </ShinyButton>

                  <ShinyButton
                    onClick={createCart}
                  className="bg-gray-300" >
                  <span  className="text-[.6rem]  text-black">Add To Cart</span>
                </ShinyButton>
               </div>
                {/* <Button className="w-20 border-none px-12 py-5 bg-pink-400 hover:bg-pink-400 rounded-sm
                 text-sm md:py-3 sm-py-1 lg:py-3  text-gray-900 border-2 dark:bg-gradient-to-r
                  dark:from-orange-400 dark:to-orange-600  duration-300 hover:text-black ">
                  Buy Now
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product description and Review */}
     
      <div className="btns text-black dark:text-white max-w-7xl rounded-md
       flex gap-1 mx-auto mt-20  items-center w-full sm:justify-start justify-center text-sm ">
        <button
          onClick={() => setIsReviewOpen(true)}
          className={`border border-black dark:border-gray-400 rounded-sm px-4 py-2
            ${isReviewOpen ? "bg-violet-400 text-black" : ""}`}>
          Review
        </button>
        <button
         onClick={() => setIsReviewOpen(false)}
         className={`border border-black dark:border-gray-400 rounded-sm px-4 py-2
           ${!isReviewOpen ? "bg-violet-400 text-black" : ""}`}>
          Description
          </button>
      </div>


      {isReviewOpen ? <Review product={product} /> : <Description product={product} />}
     
    </div>
  );
};

export default ProductDetail;