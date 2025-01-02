import mongoose, { 
  Schema, 
  Types,
  Document } from "mongoose";

  export enum Size {
    XS = "Extra Small",
    S = "Small",
    M = "Medium",
    L = "Large",
    XL = "Extra Large",
    XXL = "Double Extra Large"
  }

interface ICart extends Document {
  userId: Types.ObjectId;
  product: Types.ObjectId,
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

const Cart = mongoose.models.Cart 
  || mongoose.model("Cart", cartSchema);


export default Cart;
export type  {
  ICart
}