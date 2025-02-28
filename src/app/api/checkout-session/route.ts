import conf from "@/helpers/conf";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(conf.stripe_secret_key);

type itemsType = { 
  items: { 
    name: string; 
    price: number; 
    quantity: number,
    image: string
  }[] 
} 

export async function POST(req:NextRequest) {
  try {
    const { items }:itemsType = await req.json();

    // Define your line items
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image]
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IN"]
      },
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    });

    return NextResponse.json({
      id: session.id,
    }, { status: 200 });
  } catch (err:any) {
    return NextResponse.json({
      message: err.message,
    }, { status: 400})
  }
}
