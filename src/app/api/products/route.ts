import { 
  NextResponse, 
  NextRequest 
} from "next/server";
import connectDB from "@/db/connect";
import Product, { IProduct } from "@/models/product.models";

connectDB();

const handler 
  = async function(req: NextRequest) : Promise<NextResponse> {
    try {  
      // get all products then send it to the product page
      const products:Array<IProduct> 
        = await Product.find();

      return NextResponse.json({
        success: true,
        message: "Your products",
        data: products
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