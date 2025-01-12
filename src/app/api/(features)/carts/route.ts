import { 
  NextResponse, 
  NextRequest 
} from "next/server";
import { getToken } from "next-auth/jwt";
import conf from "@/helpers/conf";
import Cart, { ICart } from "@/models/cart.models";
import connectDB from "@/db/connect";
import Product from "@/models/product.models";

const handler = async (req:NextRequest) => {
  try {
    await connectDB();
    Product.init();
    const token = await getToken({
      req, 
      secret: conf.secret
    });

    if(!token) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized user request"
      }, {status: 401});
    }

    const carts:Array<ICart> 
      = await Cart.find()
        .populate('product')
    
    return NextResponse.json({
      success: true,
      data: carts.filter(cart => 
        cart.userId.toString() == token.sub
      ),
      message: "Packets recieved"
    }, {status: 200})
    
  } catch (error:any) {
    console.log("Something went wrong on Cart route", error)
    return NextResponse.json({
      success: false,
      message:  error.message
         || "someting went wrong"
    }, {status: 500});
  }
}

export async function POST(req:NextRequest) {
  try {
    const body:ICart = await req.json();
    const { product, productSize, 
      quantity, userId } = body;

    const existingCart:(ICart | null) = await Cart.findOne({
      $and: [{product}, {userId}] })

    let cart:ICart;
    if(existingCart) {
      existingCart.quantity += quantity;
      cart = await existingCart.save();
    } else {
      cart = await Cart.create({
        product: product,
        userId: userId,
        quantity: quantity,
        productSize: productSize
      })
    }

    const populatedCart 
    = await Cart.findById(cart?._id).populate("product");
    
    return NextResponse.json({
      success: true,
      message: "Cart created",
      data: populatedCart
    })

  } catch (err:any) {
    console.log("Something went wrong on Cart route", err)
    return NextResponse.json({
      success: false,
      message:  err.message
         || "someting went wrong"
    }, {status: 500});
  }
}


export {
  handler as GET
}