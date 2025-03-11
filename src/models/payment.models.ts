import mongoose, {
	Schema,
	Types,
	Document,
} from "mongoose";

interface IPayment extends Document {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	sessionId: string;
	invoiceId: string
	amount_subtotal: number
	amount_total: number;
	currency: string;
	payment_status: string;
	payment_date: Date;
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
	phone_number: string
	invoice_url: string
	paymentIntentId: string
	email: string
}

const paymentSchema = new Schema<IPayment>({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}, 
	sessionId: {
		type: String,
		required: true,
		unique: true
	},
	invoice_url: String,
	amount_total: Number,
	amount_subtotal: Number,
	currency: String,
	payment_status: String,
	payment_date: Date,
	shipping_details: {
		city: String,
		country: String,
		line1: String,
		line2: String,
		postal_code: String,
		state: String,
		name: String,
		shipping_cost: Number,
		tracking_number: {
			type: String,
			required: false
		}
	},
	phone_number: String,
	invoiceId: String,
	paymentIntentId: String,
	email: String
},{ timestamps: true });


const Payment = mongoose.models.Payment
	|| mongoose.model('Payment', paymentSchema);

export default Payment;
export type {
	IPayment
}