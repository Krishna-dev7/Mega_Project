"use client"
import {
  Sheet,
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
import { 
  clearCarts,
  setCarts
 } from "@/store/cartSlice";
import cartService from "@/services/CartService"
import { AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter
 } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

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

  <SheetContent  className="text-sm">
    <SheetTitle>Your Cart 👋</SheetTitle>
    <SheetHeader className="text-sm text-start mt-1 mb-4 flex-row justify-between text-gray-400">
      Cart details
        {carts.length > 0 && <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Clear</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure? ✋</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                carts and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                cartService.deleteCarts();
                dispatch(clearCarts());
              }} >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>}
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
      className="border-t w-full text-pretty flex sm:flex-row flex-col items-center justify-between gap-4 border-gray-500 py-4 mt-5 px-4">
      { carts.length > 0 ? <>
        <p className="text-sm">
        Total Cost: <span className="text-yellow-300">${totalCost}</span>
      </p>
      <ShinyButton className="" >
        <span className="sm:text-xs text-pretty text-[.7rem] text-fuchsia-400">Checkout</span>
      </ShinyButton>
      </> : <div className="text-center w-full" >Add some item 😊</div> }
    </SheetFooter>
  </SheetContent>

 </Sheet>
}


export default CartSheet;