import connectDB from "./connect";
import Product, { IProduct, Categories } from "@/models/product.models";
import mongoose, {Types} from "mongoose";


async function seedProducts() {
  try {
    
    await connectDB();
    const userId: Types.ObjectId = new Types.ObjectId("6767ccb69fc3f3a2a70f8ca1");

    const products: Array<IProduct> = await Product.insertMany([
      {
        slug: "macbook-pro-16",
        brand: "Apple",
        category: Categories.ELECTRONICS,
        description: "16-inch MacBook Pro with M2 Pro chip, 16GB RAM, 512GB SSD",
        price: 2499,
        countInStock: 8,
        images: [
          {
            url: "https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_SL1500_.jpg",
            color: "space-gray",
          }
        ],
        owner: userId
      },
      {
        slug: "samsung-galaxy-s24-ultra",
        brand: "Samsung",
        category: Categories.ELECTRONICS,
        description: "Samsung Galaxy S24 Ultra with 256GB storage and 12GB RAM",
        price: 1299,
        countInStock: 15,
        images: [
          {
            url: "https://m.media-amazon.com/images/I/71HtN4qqLZL._AC_SL1500_.jpg",
            color: "phantom-black",
          }
        ],
        owner: userId
      },
      {
        slug: "nike-air-zoom-pegasus",
        brand: "Nike",
        category: Categories.FOOTWEAR,
        description: "Nike Air Zoom Pegasus 39 Running Shoes",
        price: 129,
        countInStock: 25,
        images: [
          {
            url: "https://i.pinimg.com/736x/de/2d/02/de2d021e61235ccfcd81fa355f6790fc.jpg",
            color: "black",
          },
          {
            url: "https://i.pinimg.com/236x/67/ac/0d/67ac0d3169ba13ea4dd68c72274c390d.jpg",
            color: "white",
          }
        ],
        owner: userId
      },
      {
        slug: "sony-wh1000xm5",
        brand: "Sony",
        category: Categories.ELECTRONICS,
        description: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        price: 399,
        countInStock: 12,
        images: [
          {
            url: "https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SL1500_.jpg",
            color: "black",
          },
          {
            url: "https://m.media-amazon.com/images/I/61Unf5DuyCL._AC_SL1500_.jpg",
            color: "silver",
          }
        ],
        owner: userId
      },
      {
        slug: "levi-501-jeans",
        brand: "Levi's",
        category: Categories.FASHION,
        description: "Levi's Men's 501 Original Fit Jeans",
        price: 69.99,
        countInStock: 30,
        images: [
          {
            url: "https://i.pinimg.com/736x/0c/e4/c3/0ce4c3568854b0600958dc1752c28f43.jpg",
            color: "dark-blue",
          },
          {
            url: "https://i.pinimg.com/736x/36/5a/4c/365a4c3b448cd7652cef097c6040fb0a.jpg",
            color: "black",
          }
        ],
        owner: userId
      },
      {
        slug: "dyson-v15",
        brand: "Dyson",
        category: Categories.ELECTRONICS,
        description: "Dyson V15 Detect Cordless Vacuum Cleaner",
        price: 749,
        countInStock: 7,
        images: [
          {
            url: "https://i.pinimg.com/736x/e9/a9/b7/e9a9b72ec8478f1023f0e7bfcfdf6d4d.jpg",
            color: "nickel",
          }
        ],
        owner: userId
      },
      {
        slug: "kindle-paperwhite",
        brand: "Amazon",
        category: Categories.ELECTRONICS,
        description: "Kindle Paperwhite 8GB, 6.8-inch display with adjustable warm light",
        price: 139,
        countInStock: 18,
        images: [
          {
            url: "https://i.pinimg.com/736x/d1/83/4a/d1834a63eca274123acbe0b60b802420.jpg",
            color: "black",
          }
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