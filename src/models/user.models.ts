import mongoose, { 
	Document,
	CallbackWithoutResultAndOptionalError, 
	Schema } from "mongoose";

import SellerProfile, {SellerProfileSchema} from "./sellerProfile.models";
import UserProfile, { UserProfileSchema } from "./userProfile.models";

// interface to build perfect userSchema
interface UserVerification {
	verifyCode: string;
	isVerified: boolean;
	verifyCodeExpiry: Date;
	forgotPasswordToken: string;
	forgotPasswordTokenExpiry: Date;
}

export const enum enumProvider {
	CREDENTIALS = "credentials",
	GITHUB = "github",
}

interface UserSchema extends Document, UserVerification {
	username: string;
	fullname: string;
	email: string;
	password: string;
	avatar: string;
	phoneNumber: string;
	role: "user" | "seller";
	provider: enumProvider;
}

const userSchema = new Schema<UserSchema>({
		username: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			unique: true,
		},
		fullname: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: String,
		avatar: String,
		phoneNumber: String,
		role: String,
		verifyCode: String,
		isVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
		verifyCodeExpiry: Date,
		forgotPasswordToken: String,
		forgotPasswordTokenExpiry: Date,
		provider: {
			type: String,
			enum: ["credentials", "github"],
		},
	},{ timestamps: true },
);


userSchema.index({
	email: 1,
	username: 1
})

userSchema.pre('save',
	async function(
		this:UserSchema, 
		next: CallbackWithoutResultAndOptionalError) {
			try {

				if(this.role == "seller") {
					await SellerProfile.create<SellerProfileSchema>({
						userId: this._id,
						accountNumber: "",
						totalProducts: 0,
						totalRevenue: 0,
						brandName: this.username
					})
				} else {
					await UserProfile.create<UserProfileSchema>({
						userId: this._id,
						address: "",
						totalSpent: 0
						// add other necessary fields here
					})
				}

			} catch (error:any) {
				console.log("user models pre middleware error: " + error.message)
				next(error);
			}
		}
)

const User = mongoose.models.User
	 || mongoose.model<UserSchema>("User", userSchema);

export default User;
export type { UserSchema, UserVerification };
