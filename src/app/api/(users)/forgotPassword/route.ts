import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/db/connect";
import User from "@/models/user.models";
import bcrypt from "bcryptjs";

await connectDB();

export async function POST(req: NextRequest) {
  try {

    const {email, newPassword} = await req.json();
    const userExist = await User.findOne({email, isVerified: true});
    if(!userExist) {
      return NextResponse.json({
        success: false,
        message: "User does not exist",
      }, {status: 404});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userExist.password = hashedPassword;
    await userExist.save();
    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
    
  } catch (error:any) {
    console.log(
      "Error has been occurred at forgotPassword",
      error.message)
  }
}