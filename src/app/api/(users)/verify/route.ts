import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/db/connect";
// when user click on verify or email is sent to the user

await connectDB();

export async function POST(req: NextRequest) {
	try {
    const { email, otp } = await req.json();
    const userExist = await User
      .findOne({email});

    if(!userExist) {
      return NextResponse.json({
        success: false,
        message: "user doesn't exist"
      }, {status: 404})
    }

    if(new Date(userExist.verifyCodeExpiry) < new Date()) {
      return NextResponse.json({
        success: false,
        message: "otp has been expired"
      }, {status: 400})
    }

    if(userExist.verifyCode !== otp) {
      return NextResponse.json({
        success: false,
        message: "otp is incorrect"
      }, {status: 400})
    }


    userExist.isVerified = true
    await userExist.save();
    return NextResponse.json({
      success: true,
      message: "user verified successfully"
    }, {status: 200})

	} catch (error: any) {
    console.error(
      "Something went wrong in verify route", 
      error.message
    )

    return NextResponse.json({
      success: false,
      message: error.message || "something went wrong"
    }, {status: 500})
  } 
}

// resebd email feature
export async function GET(req:NextRequest) {
  try {
    
    const {searchParams} = new URL(req.url);
    const email = searchParams.get('email');

    const userExist = await User.findOne({email, isVerified: false})

    if(userExist) {
      if(new Date(userExist.verifyCodeExpiry) > new Date()) {
        await User.findOneAndDelete({
          email: userExist.email,
          isVerified: false
        })

        return NextResponse.json({
          success: false,
          message: "your verification has been expired, signup again"
        }, {status:200});

      } else {
        const otp = Math.floor(1000 + (Math.random() * 9000));
        userExist.verifyCode = otp.toString();
        await userExist.save()

        // send verification email again
        const emailRes = await sendVerificationEmail(
          userExist.email,
          otp.toString(),
          userExist.username,
          "Verification email"
        )

        return NextResponse.json({
          success: true,
          message: emailRes.message || "otp has been sent"
        }, {status: 200});

      }
    } else {
      return NextResponse.json({
        success: false,
        message: "User doesn't exist with this email"
      }, {status: 405})
    }

  } catch (error:any) {
    console.log("verify error: ", error.message)
    return NextResponse.json({
      success: false,
      message: error.message || "something went wrong"
    }, {status: 500})
  }
}