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


export async function DELETE(req:NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const userID = searchParams.get("userID");
    if(!userID) {
      return NextResponse.json({
        success: false,
        message: "Please send userID"
      }, {status: 400 })
    }

    const deletedUser:(UserSchema | null) 
      = await User.findByIdAndDelete(userID);

    if(!deletedUser) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, {status: 404})
    } 

    deletedUser.role == "seller"
      ? await SellerProfile.findOneAndDelete({userId: userID})
      : await UserProfile.findOneAndDelete({userId: userID})

    return NextResponse.json({
      success: true,
      message: "user has been deleted",
      data: deletedUser
    }, {status: 200})

  } catch (err:any) {
    console.log("Users Route Delete error", err.message)
    return NextResponse.json({
      success: false,
      message: err.message 
        || "Something went wrong"
    }, {status: 500});
  }
}


export {
  handler as GET
}