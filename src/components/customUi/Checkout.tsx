"use client"

import { useAppSelector } from "@/store/store";
import CheckoutItem from "@/components/customUi/checkout/CheckoutItem";

const Checkout:React.FC = () => {

  const carts = useAppSelector(store => store.cart.carts)

  return <div className=" flex sm:text-sm text-xs mt-10 max-w-screen      
     sm:w-[90%] w-full mx-auto items-center xm:px-16 px-0 " > 
      {/* <div className="  rounded-sm justify-center gap-20 flex lg:flex-row flex-col mx-auto w-full px-4 items-center " >
        <div className="left flex-grow w-screen md:w-screen">
          <CheckoutItem />
        </div>
        <div className="righ w-1/2 h-fit"> 
          Payment Details
        </div>
      </div> */}

      <div className="checkout-grid grid grid-cols-1 md:grid-cols-2 h-fit min-h-screen mb-20
        rounded-lg gap-20 w-full sm:p-5 py-1 px-0 ">
          <div className=" address w-full border rounded-lg " ></div>
          <div className=" summary row-span-2 md:row-span-1 h-fit w-full border rounded-lg " >
            <CheckoutItem />
          </div>
          <div className=" info w-full border  rounded-lg" ></div>
      </div>

  </div>
}

export default Checkout;