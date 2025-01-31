import { 
  NextResponse,
  NextRequest 
} from "next/server";
import connectDB from "@/db/connect";
import User, { UserSchema } from "@/models/user.models";
import UserProfile from "@/models/userProfile.models";
import SellerProfile from "@/models/sellerProfile.models";
connectDB();

async function handler(req:NextRequest) {
  try {
    const param = new URL(req.url);
    const { searchParams } = param;
    const id = searchParams.get('id');

    if(!id) {
      return NextResponse.json({
        success: true,
        message: "id not found"
      }, {status: 400})
    }

    const account:(UserSchema | null) = await User.findById(id);
    if(!account) {
      return NextResponse.json({
        success: false,
        message: "No such user found"
      }, {status: 401});
    }

    const profile 
      = account.role == "user"
        ? await UserProfile.findOne({userId: account._id})
        : await SellerProfile.findOne({userId: account._id})

    return NextResponse.json({
      success: true,
      data: {account, profile},
      message: "user found"
    }, {status: 200});

  } catch (err:any) {
    console.log("Users Route error", err.message)
    return NextResponse.json({
      success: false,
      message: err.message || "user found"
    }, {status: 500});
  }
}


export {
  handler as GET
}