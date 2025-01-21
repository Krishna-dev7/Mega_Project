"use client";

import conf from "@/helpers/conf";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise: Promise<Stripe | null> 
  = loadStripe(conf.stripe_publishable_key);

interface CheckoutButtonProps {
  items: { name: string; price: number; quantity: number }[];
}

export default function CheckoutButton({ items }: CheckoutButtonProps) {
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
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
}
