import mongoose, {
  CallbackWithoutResultAndOptionalError,
  Schema, 
  Document,
  Types,
} from "mongoose";
import Product from "./product.models";

export enum OrderStatus {
  PENDING = "pending",
  SHIPPED = "shipped",
  CONFIRMED = "confirmed",
  DELIVERED = "delivered",
  CANCELLED = "cancelled"
}

interface IOrder extends Document {
  userId: Types.ObjectId,
  totalAmount: number,
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
  totalAmount: {
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

    // reduce quantity of products in stock
    this.products.forEach( async (product) => {
      const productDoc = await Product
        .findById({_id: product.productId});

      if(productDoc) {
        productDoc.countInStock -= product.quantity;
        await productDoc.save();
        // also calculates the total amount of the order
        this.totalAmount 
          = productDoc.price * product.quantity; 
      }
    })
    
  } catch (error:any) {
    console.log("order pre hook error: ", error.message);
    next(error)
  }
}

orderSchema.pre("save", handleProductStock); 

const Order = mongoose.models.Order
  || mongoose.model("Order", orderSchema);


export default Order;