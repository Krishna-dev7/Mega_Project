"use client"

import Checkout from "@/components/customUi/checkout/Checkout";
import ProgressBar from "@/components/customUi/ProgressBar";

const CheckoutPage:React.FC = () => {

  return <div className="min-h-screen  sm:pt-32 pt-24" >
    <div className="track">

    </div>
    <h1 className="text-xl text-center text-pretty " >
      Checkout 👋
    </h1>
    <Checkout />
  </div>
}

export default CheckoutPage;