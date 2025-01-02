"use client"
import { ICart } from "@/models/cart.models";
import { IProduct } from "@/models/product.models";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

type props = {
  cart?: ICart & {productId: IProduct}
}

const CartItem:React.FC<props> = ({
  cart
}) => {

  return <div className="w-full flex justify-between gap-3 mb-8" >
    <div className="sec1 flex-shrink-0 sm:text-sm text-xs">
      <Avatar>
        <AvatarImage 
          className=" w-16 h-16 aspect-square rounded-lg"
          src={cart?.productId.images[0].url 
          || "https://i.pinimg.com/236x/25/2f/ae/252fae4c0fe38159bd193c94e25438a5.jpg"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
    <div className="sec2 flex-grow ">
      <p className=" text-pretty  overflow-hidden text-ellipsis line-clamp-1 " > Panda Product hai bhai </p>
      <span className="text-gray-400" > Size: XL </span>
    </div>
    <div className="sec3 flex-shrink-0 sm:text-[1rem] text-sm text-pretty ">
      <p className="text-fuchsia-300" >$400</p>
    </div>
  </div>

}


export default CartItem;