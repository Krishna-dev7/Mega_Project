import conf from "@/helpers/conf";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(conf.stripe_secret_key)

async function GET(req:NextRequest) {
  try {
    const {searchParams} = new URL(req.url)
    const paymentIntentId 
      = searchParams.get('paymentIntentId')

    if(!paymentIntentId) {
      return NextResponse.json({
        success: false,
        message: "missing required params"
      }, {status: 400})
    }

    const res = await stripe
      .paymentIntents
      .retrieve(paymentIntentId)

    return NextResponse.json({
      success: true,
      message: 'received payment intent',
      data: res
    }, {status: 200})
    
  } catch (err:any) {
    return NextResponse.json({
      success: true,
      message: 'Paymentintent get route err:' + err.message
    }, {status: 500})
  }
}


export {
  GET
}