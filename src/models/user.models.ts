import mongoose, { 
	Document,
	Schema, 
	Types} from "mongoose";

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
	_id: Types.ObjectId
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

const User = mongoose.models.User
	 || mongoose.model<UserSchema>("User", userSchema);

export default User;
export type { UserSchema, UserVerification };
