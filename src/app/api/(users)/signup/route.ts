import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/connect";
import User from "@/models/user.models";
import type { UserSchema } from "@/models/user.models";
import bcrypt from "bcryptjs";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import { enumProvider } from "@/models/user.models";

await connectDB();

const handler = async (req: NextRequest) => {
    try {

        const data:UserSchema = await req.json();
        const {username, email, password} = data;

        // check whether username is taken by verified user or not
        const userExistByUsername = await User.findOne({
            username
        });

        if(userExistByUsername) {
            return NextResponse.json({
                success: false,
                message: "user with this username is already exist"
            }, {status: 200});
        }

        // check whether email is taken by verified user or not
        const userExistByEmail = await User.findOne({
            email
        });

        // generate otp
        const verifyCode = Math.floor(Math.random() * 9000 + 1000);
        const verifyCodeExpiry = new Date(Date.now() + 3600 * 5);

        if(userExistByEmail) {
            if(userExistByEmail.isVerified) {
                return NextResponse.json({
                    success: false,
                    message: "user with this email is alreayd exits"
                }, {status: 200})
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
            await User.create({
                username,
                email,
                password: hashedPassword,
                fullname: data.fullname,
                role: data.role,
                avatar: data.avatar,
                phoneNumber: data.phoneNumber,
                provider: enumProvider.CREDENTIALS
            });
        }

        // send verification email
        const res = await sendVerificationEmail(
            email,
            verifyCode.toString(),
            username,
            "Otp verification"
        )

        return NextResponse.json(
            res,
            {status: 200}
        )
        
    } catch (error:any) {
        console.log("signup route error: " + error.message)
        throw new Error(error.message);
    }
}


export {
    handler as POST
}