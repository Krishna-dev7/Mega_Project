import mongoose, { Schema, Types } from "mongoose";

interface ICart extends Schema {
  userId: Types.ObjectId;
  product: Types.ObjectId,
  quantity: number;
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