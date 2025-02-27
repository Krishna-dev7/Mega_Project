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

export async function DELETE(req:NextRequest) {
  try {

    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');
    const ids = searchParams.get('ids')?.split(",");
    const action = searchParams.get('action');
    if(!(id || action)) {
      return NextResponse.json({
        success: false,
        message: "missing required cartId"
      }, {status: 400})
    }

    if(action == "removeAll") {

      if(ids?.length !== 0 
          && !ids?.includes('undefined')) {
        console.log("ids", ids);
        await Cart.deleteMany({_id: {$in: ids}});
        return NextResponse.json({
          success: true,
          message: "Carts deleted successfully"
        }, {status: 200})
      }
      await Cart.deleteMany({});
      return NextResponse.json({
        success: true,
        message: "Cart cleared"
      }, {status: 200})
    }

    await Cart.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Cart deleted successfully"
    }, {status: 200})
    
  } catch (err:any) {
    console.log("Something went wrong on Cart route", err)
    return NextResponse.json({
      success: false,
      message:  err.message
         || "someting went wrong"
    }, {status: 500});
  }
}

export async function PUT(req:NextRequest) {
  try {
    
    const body = await req.json();
    const {cartId, quantity} = body
    if(!(cartId && quantity)) {
      return NextResponse.json({
        success: false,
        message: "Not received data: cartId and quantity"
      }, {status: 200})
    }

    const result = await
       Cart.findByIdAndUpdate(cartId, 
        {$set: {quantity: quantity}}, {new: true})

    return NextResponse.json({
      success: true,
      message: "updated cart successfully",
      data: result
    }, {status: 200})

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