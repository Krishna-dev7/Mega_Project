import connectDB from "./connect";
import Product, { IProduct, Categories } from "@/models/product.models";
import mongoose, {Types} from "mongoose";


async function seedProducts() {
  try {
    
    await connectDB();
    const userId: Types.ObjectId = new Types.ObjectId("6767ccb69fc3f3a2a70f8ca1");

    const products: Array<IProduct> = await Product.insertMany([
      {
        slug: "airpods-pro",
        brand: "Apple",
        category: Categories.ELECTRONICS,
        description: "AirPods Pro with active noise cancellation",
        price: 249,
        countInStock: 10,
        images: [
          {
            url: "https://m.media-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg",
            color: "white",
          },
        ],
        owner: userId,
      },
      {
        slug: "IPhone-12",
        brand: "Apple",
        category: Categories.ELECTRONICS,
        description: "Apple iPhone 12 with 5G support",
        price: 799,
        countInStock: 5,
        images: [
          {
            url: "https://m.media-amazon.com/images/I/71ZOtNdaZCL._AC_SL1500_.jpg",
            color: "blue",
          },
        ],
        owner: userId

      }
    ]);

    if(products) {
      console.log("Products Seeded Successfully");
    }

  } catch (error:any) {
    console.error(error);
    process.exit(1);
    
  }
}

seedProducts();
export default seedProducts;