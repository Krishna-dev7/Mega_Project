import mongoose, { Schema, Document, Types } from "mongoose";

interface ISeller extends Document  {
	userId: Types.ObjectId;
	accountNumber: string;
	totalProducts: number;
	totalRevenue: number;
	brandName: string;
}

const sellerProfileSchema = new Schema<ISeller>(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		accountNumber: {
			type: String,
		},
		totalProducts: {
			type: Number,
			default: 0,
		},
		totalRevenue: {
			type: Number,
			default: 0,
		},
		brandName: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const SellerProfile =
	mongoose.models.SellerProfile ||
	mongoose.model("SellerProfile", sellerProfileSchema);

export default SellerProfile;
export type {
	ISeller
}