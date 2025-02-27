import mongoose, { 
  Schema, 
  Types,
  Document } from "mongoose";
import { IProduct } from "./product.models";

  export enum Size {
    XS = "Extra Small",
    S = "Small",
    M = "Medium",
    L = "Large",
    XL = "Extra Large",
    XXL = "Double Extra Large"
  }

interface ICart extends Document {
  _id: Types.ObjectId
  userId: Types.ObjectId;
  product: Types.ObjectId | IProduct,
  quantity: number,
  productSize: Size
};


const cartSchema = new Schema<ICart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  productSize: {
    type: String,
    enum: Object.values(Size),
    default: Size.L
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, {timestamps: true});

const Cart = mongoose.models?.Cart 
  || mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
export  {cartSchema}
export type  {
  ICart
}