import { 
  NextResponse, 
  NextRequest 
} from "next/server";
import connectDB from "@/db/connect";
import Product, { IProduct } from "@/models/product.models";

connectDB();

const handler 
  = async function() : Promise<NextResponse> {
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

export const POST = async (req: NextRequest)
  : Promise<NextResponse> => {
  try {
    
    const body:IProduct = await req.json();

    const {
      slug,
      price,
      countInStock,
      images,
      description,
      category,
      owner,
      discount
    } = body;

    if(!body) {
      return NextResponse.json({
        success: false,
        message: "didn't received body or data"
      }, {status: 400})
    }
    
    const product = await Product.create({
      slug,
      price,
      description,
      images,
      category,
      owner,
      countInStock,
      discount: discount || 0
    })

    return NextResponse.json({
      success: true,
      message: "product created successfully",
      data: product
    }, {status: 200});


  } catch (err:any) {
    console.log("error in products route: ", err.message);
      return NextResponse.json({
        success: false,
        message: err.message
          || "Something went wrong in products route"
      }, {status: 500});
  }
}


export const DELETE = async (req: NextRequest)
  : Promise<NextResponse> => {
    try {
      const {searchParams} = new URL(req.url)
      const productId = searchParams.get('id')

      if(productId) {

        const product = await Product
          .findByIdAndDelete(productId)

        return NextResponse.json({
          success: true,
          message: 'product deleted'
        }, {status: 200})
      }

      const products = await Product.deleteMany({})

      return NextResponse.json({
        success: true,
        message: 'all products deleted',
        data: products
      }, {status: 200})

    } catch (err:any) {
      console.log("error in products route: ", err.message);
      return NextResponse.json({
        success: false,
        message: err.message
          || "Something went wrong in products route"
      }, {status: 500});
    }
}

export {
  handler as GET
}