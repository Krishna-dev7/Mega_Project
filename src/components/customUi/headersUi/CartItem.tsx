"use client"
import { ICart } from "@/models/cart.models";
import { IProduct } from "@/models/product.models";
import { decQuantity, delCart, incQuantity } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import React from "react";
import cartService from "@/services/CartService";
import CartSkeleton from "../skeletons/CartSkeleton";

type props = {
  cart?: ICart & {product: IProduct}
}

const CartItem:React.FC<props> = ({cart}) => {
  const dispatch = useAppDispatch();
  const incItem = async (cartId:string,
     quantity:number) => {
    try {
      const res = await cartService.updateCart({
        cartId, quantity
      });
      // console.log("CartItem:incItem ⚡", res);
      (res && res.success) 
        && dispatch(incQuantity(res.data._id));
    } catch (err:any) {
      console.log("CartItem:incItem 🔥", err.message)
    }
  }

  const decItem = async (cartId:string,
     quantity: number) => {
    try {
      if(quantity <= 0) {
        const res = await cartService.deleteCart(cartId)
        res && dispatch(delCart({id:cartId}))
        return;
      }
      const result = await cartService.updateCart({
        cartId, quantity
      })
      console.log("CartItem:decItem ⚡", result);
      dispatch(decQuantity({id: cartId}));
    } catch (err:any) {
      console.log("CartItem:decItem 🔥", err.message)
    }
  }

  if (!cart) {
    return <CartSkeleton />
  }

  return <div className="w-full box-border mx-auto py-4 flex justify-between gap-3 mb-8">
    <div className="sec1 flex-shrink-0 sm:text-sm text-xs">
      <Avatar>
        <AvatarImage 
          className="w-16 h-16 aspect-square rounded-lg"
          src={cart?.product.images[0].url 
          || "https://i.pinimg.com/236x/25/2f/ae/252fae4c0fe38159bd193c94e25438a5.jpg"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
    <div className="sec2 flex-grow mx-auto">
      <p className=" text-pretty  overflow-hidden text-ellipsis line-clamp-1 " >
        {cart?.product.slug} </p>
      <div className="flex flex-col w-full" >
        <span className="text-gray-400" > size: {cart?.productSize} </span>
        <span className="text-gray-400" > Qty: {cart?.quantity} </span>
      </div>
    </div>
    <div 
      className="sec3 flex-shrink-0 mx-auto sm:text-[1rem] text-sm 
      text-pretty ">
      <p className="text-fuchsia-300 text-center " >
        ${cart?.product.price ? cart.product.price * cart.quantity : 0}
      </p>
      <div className="text-gray-500 mt-1 mx-auto justify-between
         flex gap-1 items-center bg-gray-700 py-2 px-3 rounded-lg " >
        <span > 
          <PlusCircleIcon className="hover:text-gray-300 hover:cursor-pointer" fontStyle={"light"} size={17} 
          onClick={ () => cart?._id 
            && incItem(cart._id.toString(), cart.quantity+1 ) } /> 
        </span>

        <span className="text-pink-300" > 
          {cart?.quantity} 
        </span>

        <span>
          <MinusCircleIcon className="hover:text-gray-300 
            hover:cursor-pointer" fontStyle={"light"} size={17}
          onClick={() => cart?._id   
            && decItem(cart._id.toString(), cart.quantity-1)} /> 
        </span>
      </div>
      <span 
        onClick={async () => {
          if(cart?._id) {
            await cartService.deleteCart(cart._id.toString())
            dispatch(delCart({id: cart._id.toString()}))
          }
        }}
        className="text-black cursor-pointer bg-gray-300 border 
          border-gray-400 rounded-md px-3 py-1 text-xs mt-1 
         mx-auto block" >
        remove
      </span>
    </div>
  </div>
}

export default CartItem;