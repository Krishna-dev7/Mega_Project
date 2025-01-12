"use client"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAppDispatch, 
  useAppSelector } from "@/store/store"
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import CartItem from "./CartItem"
import ShinyButton from "@/components/ui/shiny-button"
import axios from "axios"
import { 
  incQuantity,
  decQuantity,
  delCart,
  setCarts
 } from "@/store/cartSlice";
import conf from "@/helpers/conf"
import cartService from "@/services/CartService"

const CartSheet:React.FC = () => {

  const dispatch = useAppDispatch();
  const carts = useAppSelector(store => store.cart.carts)
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    cartService.listCarts()
      .then(res => {
        // console.log("carts: ⚡",res.data.data);
        dispatch(setCarts(res.data.data))
      })
      .catch(err => {
        console.log("carts fetch error: ",
          err.message);
      })
  }, [dispatch])

  useEffect( () => {
    let totalCost = 0;
    carts.forEach( cart => {
      totalCost += cart.quantity * cart.product.price
    })

    setTotalCost(totalCost)
  }, [setTotalCost, carts] )

  return  <Sheet  >
  <SheetTrigger>
    <ShoppingCart className="w-4 h-4 dark:text-black " />
    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full 
      w-3.5 h-3.5 flex items-center justify-center">
      0
    </span>
  </SheetTrigger>

  <SheetContent className="text-sm">
    <SheetTitle>Your Cart 👋</SheetTitle>
    <SheetHeader className="text-sm text-start mt-1 mb-4 text-gray-400">
      Cart details
    </SheetHeader>

    {/* Scrollable Cart Item Container */}
    <div
      className="max-h-96 overflow-y-auto space-y-4 px-2"
      style={{
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none", // For IE and Edge
      }}
    >
      <style jsx>{`
        /* For Webkit Browsers (Chrome, Safari, etc.) */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* {Array.from({ length: 10 }).map((_, index) => (
        <CartItem key={index} />
      ))} */}

      { carts && carts.map((cart, idx) => (
         <CartItem key={idx} cart={cart} />
      )) }
    </div>

    {/* Footer */}
    <SheetFooter
      className="border-t w-full flex flex-col-reverse items-center gap-2
        text-pretty justify-evenly flex-nowrap text-sm border-gray-500 py-5 mt-5"
    >
      <p className="mx-auto sm:text-sm text-xs " >
        Total Cost: <span className="text-yellow-300">${totalCost}</span>
      </p>
      <ShinyButton>
        <span className="sm:text-xs text-pretty text-[.7rem] text-fuchsia-400">Checkout</span>
      </ShinyButton>
    </SheetFooter>
  </SheetContent>

 </Sheet>
}


export default CartSheet;