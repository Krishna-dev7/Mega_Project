"use client"

import { useAppSelector } from "@/store/store";
import CheckoutItem from "./CheckoutItem";
import ShippingAddress from "./ShippingAddress";
import Schedule from "./Schedure";

const Checkout:React.FC = () => {

  const carts = useAppSelector(store => store.cart.carts)

  return <div className=" flex sm:text-sm text-xs mt-10 max-w-screen      
     sm:w-[90%] w-full mx-auto items-center xm:px-16 px-0 " > 

      <div className="checkout-grid grid grid-cols-1 md:grid-rows-2 
        md:grid-cols-2 grid-rows-3  h-fit min-h-screen mb-20 rounded-lg 
        gap-20 gap-y-5 w-full sm:p-5 py-1 px-0 ">
          <div className=" address w-full border rounded-lg " >
            <ShippingAddress />
          </div>

          <div className=" summary row-span-2 h-full w-full 
            border rounded-lg " >
            <span className="text-center w-full block" >Order summary</span>
            <CheckoutItem />
          </div>

          <div className=" info w-full rounded-lg" >
            <Schedule />
          </div>
      </div>
  </div>
}

export default Checkout;