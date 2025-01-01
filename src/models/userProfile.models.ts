import mongoose, { 
	Schema, 
	Types,
	Document } from "mongoose";

interface IUserProfile extends Document {
	userId: Types.ObjectId;
	address: string;
	totalSpent: number;
}

const userProfileSchema = new Schema<IUserProfile>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	totalSpent: {
		type: Number,
		default: 0,
	},
});

const UserProfile =
	mongoose.models.UserProfile ||
	mongoose.model<IUserProfile>("UserProfile", userProfileSchema);

export default UserProfile;
export type {
	IUserProfile
}