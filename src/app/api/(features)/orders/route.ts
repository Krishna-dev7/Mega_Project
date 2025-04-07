import Order, { IOrder } from "@/models/order.models";
import { 
  NextResponse, 
  NextRequest 
} from "next/server";

const handler = async (req:NextRequest) => {
  try {
    const {searchParams} = new URL(req.url)
    const orderId = searchParams.get('orderId')
    const action = searchParams.get('action')

    if(!orderId && !action) {
      return NextResponse.json({
        success: false,
        message: "missing required params"
      }, {status: 400})
    }

    let result;
		if (action === "streamOrders") {
			result = await Order.find().populate([
				{
					path: "userId",
					model: "User",
				},
			]);
		}

		if (orderId) {
			result = await Order.findById(orderId).populate([
				{
					path: "userId",
					model: "User",
				},
        {
          path: "products.productId",
          model: "Product"
        },
        {
          path: "paymentId",
          model: "Payment"
        }
			]);
		}
    

    return NextResponse.json({
      success: true,
      message: `${action} done successfully`,
      data:  result
    }, {status: 200})

  } catch (error:any) {
    console.log("Something went wrong on Order route",
       error.message)
    return NextResponse.json({
      success: false,
      message:  error.message || "someting went wrong order route"
    }, {status: 500});
  }
}


async function POST(req:NextRequest) {
  try {

    const body:IOrder = await req.json();

    if(!body) {
      return NextResponse.json({
        success: false,
        message: "didn't received body or data"
      }, {status: 400})
    }

    // calculate esitmated date
    const date = new Date()
    date.setDate(date.getDate() + 3 )

    const order = await Order.create({
      userId: body.userId,
      products: body.products,
      paymentId: body._id,
      status: body.status,
      estimatedDate: date,
      shipping_details: body.shipping_details
    })

    return NextResponse.json({
      success: true,
      message: "order created successfully",
      body: order
    }, {status: 200})
    
  } catch (err:any) {
    console.log("Something went wrong on Cart route",
      err.message)
   return NextResponse.json({
     success: false,
     message:  err.message 
      || "someting went wrong"
   }, {status: 500});
  }
}


export {
  handler as GET,
  POST
}