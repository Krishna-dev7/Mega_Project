import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/db/connect";
import Product, { IProduct } from "@/models/product.models";
import Cart from "@/models/cart.models";

connectDB();


const handler = async function (): Promise<NextResponse> {
  try {
    const products: Array<IProduct> = await Product.find();
    return NextResponse.json({
      success: true,
      message: "Your products",
      data: products,
    }, { status: 200 });

  } catch (error: any) {
    console.log("Error in products route: ", error.message);
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong in products route",
    }, { status: 500 });
  }
};

const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const body: IProduct = await req.json();

    const { slug, price, countInStock, images, description, category, owner, discount } = body;

    if (!body) {
      return NextResponse.json({
        success: false,
        message: "Didn't receive body or data"
      }, { status: 400 });
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
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      data: product
    }, { status: 201 });

  } catch (err: any) {
    console.log("Error in products route: ", err.message);
    return NextResponse.json({
      success: false,
      message: err.message || "Something went wrong in products route"
    }, { status: 500 });
  }
};

const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json({
        success: false,
        message: "Product ID is required"
      }, { status: 400 });
    }

    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(productId, body, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({
        success: false,
        message: "Product not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    }, { status: 200 });

  } catch (err: any) {
    console.log("Error in updating product: ", err.message);
    return NextResponse.json({
      success: false,
      message: err.message || "Something went wrong while updating the product"
    }, { status: 500 });
  }
};


const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    if (productId) {
      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return NextResponse.json({
          success: false,
          message: "Product not found"
        }, { status: 404 });
      }

      await Cart.deleteMany({ product: { $in: productId } });

      return NextResponse.json({
        success: true,
        message: "Product deleted successfully"
      }, { status: 200 });
    }

    const products = await Product.deleteMany({});

    return NextResponse.json({
      success: true,
      message: "All products deleted",
      data: products
    }, { status: 200 });

  } catch (err: any) {
    console.log("Error in deleting product: ", err.message);
    return NextResponse.json({
      success: false,
      message: err.message || "Something went wrong in products route"
    }, { status: 500 });
  }
};


export { handler as GET,
  POST as POST,
  PUT as PUT,
  DELETE as DELETE,

 };
