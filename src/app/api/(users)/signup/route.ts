import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/connect";
import User from "@/models/user.models";
import type { UserSchema } from "@/models/user.models";
import bcrypt from "bcryptjs";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import { enumProvider } from "@/models/user.models";
import SellerProfile, { ISeller } from "@/models/sellerProfile.models";
import UserProfile from "@/models/userProfile.models";

await connectDB();

const handler = async (req: NextRequest) => {
	try {
		const data: UserSchema = await req.json();
		console.log(data);
		const { username, email, password } = data;

		// check whether username is taken by verified user or not
		const userExistByUsername = await User.findOne({
			username,
		});

		if (userExistByUsername) {
			return NextResponse.json({
					success: false,
					message: "user with this username is already exist",
				},{ status: 200 }
			);
		}

		// check whether email is taken by verified user or not
		const userExistByEmail = await User.findOne({
			email,
		});

		// generate otp
		const verifyCode = Math.floor(Math.random() * 9000 + 1000);
		const verifyCodeExpiry = new Date(Date.now() + 3600 * 24 * 60);
		let user = null;

		if (userExistByEmail) {
			if (userExistByEmail.isVerified) {
				return NextResponse.json({
						success: false,
						message: "user with this email is alreayd exits",
					},{ status: 200 }
				);
			} else {
				const hashedPassword = await bcrypt.hash(password, 10);
				userExistByEmail.password = hashedPassword;
				userExistByEmail.username = username;
				userExistByEmail.email = email;
				userExistByEmail.verifyCode = verifyCode.toString();
				userExistByEmail.verifyCodeExpiry = verifyCodeExpiry;
				await userExistByEmail.save();
			}
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			user = await User.create({
				username,
				email,
				password: hashedPassword,
				fullname: data.fullname,
				role: data.role,
				avatar: data.avatar,
				phoneNumber: data.phoneNumber,
				provider: enumProvider.CREDENTIALS,
				verifyCode,
				verifyCodeExpiry
			});
		}

		// create seller or user profile based on their role
		if(user) {
			if(user.role == "seller") {
				await SellerProfile.create<ISeller>({
					userId: user._id,
					accountNumber: "",
					totalProducts: 0,
					totalRevenue: 0,
					brandName: "Addidas"
				})
			} else {
				await UserProfile.create({
					userId: user._id,
					address: "",
					totalSpent: 0
				})
			}
		}

		// send verification email
		const res = await sendVerificationEmail(
			email,
			verifyCode.toString(),
			username,
			"Otp verification"
		);

		return NextResponse.json({
			success: true,
			message: res.message
		}, { status: 200 });

	} catch (error: any) {
		console.log("signup route error: " + error.message);
		console.log(error)
		return NextResponse.json({
			success: false,
			message: error.message || "error while signing up",
		}, {status: 500});

	}
};

export { handler as POST };