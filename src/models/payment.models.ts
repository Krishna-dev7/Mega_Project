import mongoose, {
    Schema,
    Types,
    Document
} from "mongoose";


interface IPayment extends Document {
    _id: Types.ObjectId
    session_id: string
    user_id: Types.ObjectId
    transaction_id: string
    amount: number
    currency: string
    payment_status: boolean
    payment_date: Date
    confirmationDate: Date
    billingAddress: string
    paymentDetails
}