import mongoose, {
	Document,
	Schema,
	Types,
} from "mongoose";

export const enum enumProvider {
	CREDENTIALS = "credentials",
	GITHUB = "github",
}

interface UserSchema extends Document {
	_id: Types.ObjectId;
	username: string;
	fullname: string;
	email: string;
	password: string;
	dob: Date,
	role: "user" | "admin" | "superAdmin";
	provider: enumProvider;
	avatar: string;
	address: string;
	phoneNumber: string;
	verifyCode: string;
	isVerified: boolean;
	verifyCodeExpiry: Date;
	forgotPasswordToken: string;
	forgotPasswordTokenExpiry: Date;
}

const userSchema = new Schema<UserSchema>(
	{
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
		role: String,
		avatar: String,
		address: String,
		dob: Date,
		phoneNumber: {
			type: String,
			min: [10, "must be 10 character long"],
			max: [10, "must be 10 character long"],
		},
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
	},
	{ timestamps: true },
);

userSchema.index({
	email: 1,
	username: 1,
});

const User =
	mongoose.models.User ||
	mongoose.model<UserSchema>("User", userSchema);

export default User;
export type { UserSchema };
