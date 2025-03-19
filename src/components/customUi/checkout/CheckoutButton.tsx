"use client";

import conf from "@/helpers/conf";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import paymentService from "@/services/PaymentService";


interface CheckoutButtonProps {
  items: { 
    name: string; 
    price: number; 
    quantity: number,
    image: string,
    itemId: string
  }[];
  props?: React.HTMLAttributes<HTMLDivElement>;
}

function CheckoutButton({ items, ...props }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await paymentService.initiateCheckout({items})
      setLoading(false);
    } catch (err:any) {
      console.log(`checkoutButton::
        initiateCheckout err: ${err}`);
    }
  };

  return (
    <Button {...props} onClick={handleClick} disabled={loading}>
      {loading ? "Processing..." : "Checkout"}
    </Button>
  );
}

export default CheckoutButton;