import mongoose, {
  CallbackWithoutResultAndOptionalError,
  Schema, 
  Types,
} from "mongoose";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled"
}

interface IOrder extends Schema {
  userId: Types.ObjectId,
  totalAmmount: number,
  status: OrderStatus,
  products: [{
    productId: Types.ObjectId,
    quantity: number
  }]
}


const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  totalAmmount: {
    type: Number,
    required: true,
    min: 1
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
    }
  }]
}, {timestamps: true});


const handleProductStock = async function(this: IOrder, 
  next:CallbackWithoutResultAndOptionalError
) {
  try {

    
    
  } catch (error:any) {
    console.log("order pre hook error: ", error.message);
    next(error)
  }
}

orderSchema.pre("save", handleProductStock); 


const Order = mongoose.models.Order
  || mongoose.model("Order", orderSchema);


export default Order;