import SuccessPage from "@/app/(client)/(stripe)/success/page";
import connectDB from "@/db/connect";
import conf from "@/helpers/conf";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
await connectDB()
const stripe = new Stripe(conf.stripe_secret_key);

// api
// api/stripe/refund?action=?&refundId=?

async function GET(req: NextRequest) {
  try {
      
    const {searchParams} = new URL(req.url)
    const action = searchParams.get('action')
    const refundId = searchParams.get('refundId')

    if(!action || !refundId) {
      return NextResponse.json({
        success: false,
        message: "missing required params"
      }, {status: 400})
    }

    // store result
    let result;

    if(action == "streamRefunds") {
    result = await stripe.refunds.list()
    }

    if(refundId) {
      result = await stripe
        .refunds.retrieve(refundId)
    }

    return NextResponse.json({
      success: true,
      message: `${action} done successfully`,
      data: result
    })

  } catch (err:any) {    
    return NextResponse.json({
      success: false,
      message: err.message 
        || "something went wrong",
      data: err
    }, {status: 500})
  }
}


async function POST(req: NextRequest) {
  try {
    const {paymentIntentId} = await req.json();

    if(!paymentIntentId) {
      return NextResponse.json({
        success: false,
        message: "missing required params"
      }, {status: 400})
    }
    
    const result = await stripe.refunds.create({
      payment_intent: paymentIntentId
    })

    return NextResponse.json({
      success: false,
      message: "refund created successfully",
      data: result
    }, {status: 200})

  } catch (err:any) {
    return NextResponse.json({
      success: false,
      message: err.message 
        || "something went wrong",
      data: err
    }, {status: 500})
  }
}



export {
  GET,
  POST
}