import mongoose, { Schema, Types } from "mongoose";

interface SellerProfileSchema extends Schema {
	userId: Types.ObjectId;
	accountNumber: string;
	totalProducts: number;
	totalRevenue: number;
	brandName: string;
}

const sellerProfileSchema = new Schema<SellerProfileSchema>(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		accountNumber: {
			type: String,
			required: true,
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
	mongoose.model<SellerProfileSchema>("SellerProfile", sellerProfileSchema);

export default SellerProfile;
