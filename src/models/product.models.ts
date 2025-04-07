import mongoose, { 
  Schema, 
  Types,
  Document,
 } from "mongoose";
import Cart, { Size } from "./cart.models";

interface IProduct extends Document {
  _id: Types.ObjectId
  category: Categories,
  countInStock: number;
  description: string;
  images: Array<string>;
  slug: string;
  price: number;
  rating: number;
  owner?: Types.ObjectId;
  discount: number;
  isPublished: boolean;
	sizes: Size[]
}

export enum Categories {
  BAGS = "bags",
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

const productSchema = new Schema<IProduct>(
	{
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
			default: 0,
		},
		countInStock: {
			type: Number,
			default: 0,
			min: 0,
		},
		description: {
			type: String,
			required: true,
		},
		images: [{ type: String }],
		price: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		rating: {
			type: Number,
			max: 5,
			min: 0,
			default: 0,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		sizes: [{
			type: String,
			enum: Object.values(Size),
			required: true
		}]
	},
	{ timestamps: true },
);

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