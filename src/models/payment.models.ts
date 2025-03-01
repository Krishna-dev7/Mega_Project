import mongoose, {
	Schema,
	Types,
	Document,
} from "mongoose";

interface IPayment extends Document {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	sessionId: string;
	transactionId: string;
	amount: number;
	currency: string;
	payment_status: boolean;
	payment_date: Date;
	confirmationDate: Date;
	billingAddress: string;
	order_id: Types.ObjectId;
}

const paymentSchema = new Schema<IPayment>({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}, 
	sessionId: String,
	transactionId: String,
	amount: Number,
	currency: String,
	payment_status: Boolean,
	payment_date: Date,
	confirmationDate: Date,
	billingAddress: String,
	order_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Order'
	}
},{ timestamps: true });


const Payment = mongoose.models.Payment
	|| mongoose.model('Payment', paymentSchema);

export default Payment;