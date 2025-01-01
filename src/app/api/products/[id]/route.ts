import { 
  NextResponse, 
  NextRequest 
} from "next/server";
import connectDB from "@/db/connect";
import Product, { IProduct } from "@/models/product.models";
import { date } from "zod";

connectDB();

type paramType = {
  params: {
    id: string
  }
}

const handler 
  = async function(_:NextRequest, {params}:paramType) : Promise<NextResponse> {
    try {  
      // get only single product

      const {id} = await params;

      if(!id) {
        return NextResponse.json({
          success: false,
          message: "productID not found"
        }, {status: 200})
      }

      const product:(IProduct | null)
        = await Product.findById(id).populate("owner");

      return NextResponse.json({
        success: true,
        message: "Your products",
        data: product
      }, {status: 200});

    } catch (error:any) {
      console.log("error in products route: ", error.message);
      return NextResponse.json({
        success: false,
        message: error.message
          || "Something went wrong in products route"
      }, {status: 500});

    }
}

export {
  handler as GET
}