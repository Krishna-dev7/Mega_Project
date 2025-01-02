"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import conf from "@/helpers/conf";
import { Categories, IProduct } from "@/models/product.models";
import { ChevronLeft, ChevronRight, Circle, Star, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import BadgeComponent from "@/components/customUi/Badge";
import badgeConfig from "@/helpers/badgeConfig";
import { UserSchema } from "@/models/user.models";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Progress } from "@/components/ui/progress";
import ShineBorder from "@/components/ui/shine-border";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import ShinyButton from "@/components/ui/shiny-button";
import DotPattern from "@/components/ui/dot-pattern";

type customType = {
  owner: UserSchema
}

type ProductType = IProduct & customType | null;

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<ProductType>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [reviewCount, setReviewCount] = useState(new Array<number>(5).fill(0))
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { id } = useParams();

  const dummyReviews = [
    { userId: '64a5f86eb5d9b8e8a1c7e9c1', productId: '64a5f86eb5d9b8e8a1c7e9c2', comment: 'Excellent product!', rating: 5 },
    { userId: '64a5f86eb5d9b8e8a1c7e9c3', productId: '64a5f86eb5d9b8e8a1c7e9c4', comment: 'Good quality, but shipping was late.', rating: 4 },
    { userId: '64a5f86eb5d9b8e8a1c7e9c5', productId: '64a5f86eb5d9b8e8a1c7e9c6', comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', rating: 2 },
    { userId: '64a5f86eb5d9b8e8a1c7e9c7', productId: '64a5f86eb5d9b8e8a1c7e9c8', comment: 'Great value for money!', rating: 5 },
    { userId: '64a5f86eb5d9b8e8a1c7e9c9', productId: '64a5f86eb5d9b8e8a1c7e9ca', comment: 'Average, nothing special.', rating: 3 },
    { userId: '64a5f86eb5d9b8e8a1c7e9cb', productId: '64a5f86eb5d9b8e8a1c7e9cc', comment: 'Horrible quality, do not buy!', rating: 1 },
    { userId: '64a5f86eb5d9b8e8a1c7e9cd', productId: '64a5f86eb5d9b8e8a1c7e9ce', comment: 'Fast delivery, good packaging.', rating: 4 },
    { userId: '64a5f86eb5d9b8e8a1c7e9cf', productId: '64a5f86eb5d9b8e8a1c7e9d0', comment: 'Exceeded expectations!', rating: 5 },
    { userId: '64a5f86eb5d9b8e8a1c7e9d1', productId: '64a5f86eb5d9b8e8a1c7e9d2', comment: 'Okay product for the price.', rating: 3 },
    { userId: '64a5f86eb5d9b8e8a1c7e9d3', productId: '64a5f86eb5d9b8e8a1c7e9d4', comment: 'Fantastic! Will buy again.', rating: 5 },
  ];

  useEffect(() => {
    axios
      .get(`${conf.url}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        // count reviews
        dummyReviews.forEach(element => {
          setReviewCount( prev => {
            const copy = [...prev];
            console.log("Review count length: ", prev)
            copy[element.rating-1]++;
            return [...copy];
          } );
        });

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

  function Description() {
    return <ShineBorder
    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      className="max-w-7xl py-10 w-full mt-10 sm:border dark:border-gray-400 border-black rounded-lg
        shadow-md mx-auto px-4 sm:px-6 lg:px-8 " >
      <div className="description w-full h-full ">
        <div className="profile w-fit px-4 py-2 dark:text-black bg-green-300 flex
         text-sm sm:text-md border border-black rounded-sm
       text-pretty border-separate items-center gap-1" >
          <Avatar>
            <AvatarImage
              className="w-6 h-6 rounded-full"
              src={product?.owner?.avatar
                || "https://i.pinimg.com/736x/7d/9f/7b/7d9f7b3a201aa53213edad9e56b7fb1e.jpg"} />
            <AvatarFallback about="av" />
          </Avatar>

          <span>
            {product?.owner?.username || "Random"}
          </span>

          <p className="flex items-center px-2 border-l border-black" >
            {(new Array(5)).fill(0).map((item, idx) => (
              <Star
                key={idx}
                color="black"
                fill={idx < (product?.rating ?? 0) ? "black" : "transparent"}
                size={15} />
            ))}
          </p>
        </div>

        <div className="mt-5" >
          {product?.description}
        </div>
      </div>
    </ShineBorder>

  }

  function Review() {
    return <div className="reviews flex sm:flex-row flex-col-reverse justify-center text-center w-full 
    max-w-7xl py-10 text-[.8rem]  sm:border dark:border-gray-400 border border-black rounded-lg
     shadow-md mx-auto px-2 sm:px-6 mt-10 lg:px-2">
    
      <div className="left sm:w-2/3 w-full h-full items-center  px-2  ">
        <h1 className="text-xl my-2 mb-4" >Reviews</h1>

        {product && dummyReviews.map((review, idx) => (
          <div key={idx} className="review p-4 mx-auto w-full mb-2 dark:border-gray-500 border sm:m-3 rounded-md">
            <div className="profile mb-4 dark:text-gray-300 text-sm rounded-sm w-fit py-2 border border-black flex items-center gap-1" >
              <Avatar>
                <AvatarImage
                  className="w-6 h-6 rounded-full"
                  src={product.owner?.avatar
                    || "https://i.pinimg.com/736x/7d/9f/7b/7d9f7b3a201aa53213edad9e56b7fb1e.jpg"} />
                <AvatarFallback about="av" />
              </Avatar>

              <span>{product.owner?.username || "Random"}</span>
            </div>

            <p className="flex items-center gap-1 my-2">
              {new Array(review.rating).fill(0).map((item, idx) => (
                <Star 
                  className="dark:fill-gray-300 dark:text-gray-400"
                  key={idx} 
                  fill={idx < review.rating ? "black" : ""} 
                   size={14} />
              ))}
            </p>

            <p className="flex items-center text-center gap-2" >
              {/* <Circle className="w-10" size={8} fill="black" />  */}
              <span className="text-pretty text-justify" > {review.comment} </span>
            </p>

            <p className="text-light text-gray-400 text-start mt-2" > 24 days ago </p>
          </div>
        ))}
      </div>
      <div className="right w-full mx-auto sm:mb-5 mb-10 sm:w-1/3 items-center px-5">
        <h1 className="text-xl my-2 mb-4">Review Stats</h1>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={5 - i} className="flex items-center gap-2 mb-2">
            <span>{5 - i}:</span>
            <Progress
              className="w-2/3 "
              value={Math.floor((reviewCount[4 - i] / 10) * 100)} />
            {reviewCount[4 - i]}
          </div>
        ))}
      </div>
    </div>
  }


  return (
    product && <div className="min-h-screen dark:bg-[#121212] px-1 pt-24">
      <div
        
        className="max-w-7xl sm:text-sm text-xs sm:border dark:border-gray-400 border-black rounded-lg shadow-md
         mx-auto px-4 sm:px-6 lg:px-8">

      {/* <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      /> */}

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
                  rounded-full p-1 shadow-md hover:bg-white transition-colors z-10"
                >
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

                <ShinyButton className="bg-gray-300" >
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


      {isReviewOpen ? <Review /> : <Description />}
     
    </div>
  );
};

export default ProductDetail;