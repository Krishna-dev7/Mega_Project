import mongoose, {
  CallbackWithoutResultAndOptionalError,
  Schema, 
  Document,
  Types,
} from "mongoose";
import Product from "./product.models";
import { Size } from "./cart.models";
import ShippingAddress from "@/components/customUi/checkout/ShippingAddress";

export enum OrderStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  CONFIRMED = "confirmed",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  RETURNED = "returned"
}

interface IOrder extends Document {
  _id: Types.ObjectId
  userId: Types.ObjectId,
  status: OrderStatus,
  paymentId: Types.ObjectId,
	shipping_details: {
		city: string,
		country: string,
		line1: string
		line2: string
		postal_code: string
		state: string
		name: string
		tracking_number?: string
		shipping_cost: number
	},
  products: [{
    productId: Types.ObjectId,
    quantity: number,
    size: Size,
    price: number
  }],
  estimatedDate: Date
  createdAt: Date
  updatedAt: Date
}


const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    required: true
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    required: true,
    default: OrderStatus.PENDING
  },
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }, 
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    size: {
      type: String,
      enum: Object.values(Size)
    },
    price: Number
  }],
   estimatedDate: Date,
   shipping_details: {
      city: String,
      country: String,
      line1: String,
      line2: String,
      postal_code: String,
      state: String,
      name: String,
      tracking_number: String,
      shipping_cost: Number,
    }
}, {timestamps: true});

  
const handleProductStock = async function(this: IOrder, 
  next:CallbackWithoutResultAndOptionalError
) {
  try {

    // reduce quantity of products in stock
    this.products.forEach( async (product) => {
      const productDoc = await Product
        .findById({_id: product.productId});

      if(productDoc) {
        productDoc.countInStock -= product.quantity;
        await productDoc.save();
      }
    })
    
  } catch (error:any) {
    console.log("order pre hook error: ", error.message);
    next(error)
  }
}

orderSchema.pre("save", handleProductStock); 

const Order = mongoose.models?.Order
  || mongoose.model("Order", orderSchema);


export default Order;
export type {
  IOrder
}