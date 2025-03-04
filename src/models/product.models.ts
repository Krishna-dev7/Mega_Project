import mongoose, { 
  Schema, 
  Types,
  Document,
 } from "mongoose";
import Cart from "./cart.models";

interface IProduct extends Document {
  _id: Types.ObjectId
  category: Categories,
  countInStock: number;
  description: string;
  images: Array<{url: string, color?: string}>;
  slug: string;
  price: number;
  rating: number;
  owner?: Types.ObjectId;
  discount: number;
}

export enum Categories {
  BAGS = "bags",
  DRINKWARE = "drinkware",
  ELECTRONICS = "electronics",
  FOOTWEAR = "footwear",
  HEADWEAR = "headwear",
  HOODIES = "hoodies",
  JACKETS = "jackets",
  KIDS = "kids",
  PETS = "pets",
  SHIRTS = "shirts",
  STICKERS = "stickers",
  FASHION = "fashion"
}

const productSchema = new Schema<IProduct>({
  slug: {
    type: String,
    required: true,
    trim: true,
  },  
  category: {
    type: String,
    required: true,
    enum: Object.values(Categories),
  },
  discount: {
    type: Number,
    default: 0
  },
  countInStock: {
    type: Number,
    default: 0,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  images: [{
      url: String,
      color: String,
  }],
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  rating: {
    type: Number,
    max: 5,
    min: 0,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, {timestamps: true});

productSchema.index({
  slug: 1
})

console.log("Product model", mongoose.models)

const Product = mongoose.models?.Product 
  || mongoose.model("Product", productSchema);
Product.init

export default Product;
export type {
  IProduct,
  productSchema
}