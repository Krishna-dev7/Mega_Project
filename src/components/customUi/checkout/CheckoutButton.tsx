"use client";

import conf from "@/helpers/conf";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const stripePromise: Promise<Stripe | null> 
  = loadStripe(conf.stripe_publishable_key);

interface CheckoutButtonProps {
  items: { 
    name: string; 
    price: number; 
    quantity: number }[];
  isDisabled: boolean;
}
function CheckoutButton({ items, isDisabled }
  : CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const res = await fetch("/api/checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const { id } = await res.json();

    if (stripe) {
      const { error } = await stripe
        .redirectToCheckout({ sessionId: id });
      if (error) {
        console.error("Stripe checkout error:", 
          error.message);
      }
    }

    setLoading(false);
  };

  return (
    <Button
      onClick={handleClick} 
      disabled={loading || isDisabled}>
        {loading ? "Processing..." : "Checkout"}
    </Button>
  );
}



export default CheckoutButton;

// this is my comment and i hope you would definitely love it