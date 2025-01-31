"use client"
import { IProduct } from "@/models/product.models";
import { UserSchema } from "@/models/user.models";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

function Review({
  product
}: {product: IProduct & {owner: UserSchema}}) {

  const [reviewCount, setReviewCount] = useState(new Array<number>(5).fill(0))

  useEffect(() => {
    // count reviews
    dummyReviews.forEach(element => {
      setReviewCount( prev => {
        const copy = [...prev];
        console.log("Review count length: ", prev)
        copy[element.rating-1]++;
        return [...copy];
      } );
    });
  }, []);

  return <div className="reviews flex sm:flex-row flex-col-reverse justify-center text-center w-full 
  max-w-7xl py-10 text-[.8rem] sm:border dark:border-gray-400 border border-black rounded-lg
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


export default Review;