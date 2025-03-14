import { 
  NextResponse,
  NextRequest 
} from "next/server";
import connectDB from "@/db/connect";
import User, { UserSchema } from "@/models/user.models";
connectDB();

async function handler(req:NextRequest) {
  try {
    const param = new URL(req.url);
    const { searchParams } = param;
    const id = searchParams.get('id');
    const action = searchParams.get('action');

    if(action === "streamUsers") {
      const users = await User.find()

      return NextResponse.json({
        success: true,
        data: users,
        message: "users found"
      })
    }
    
    if(!id) {
      return NextResponse.json({
        success: true,
        message: "id not found"
      }, {status: 400})
    }

    const userInfo = await User.findById(id);
    if(!userInfo) {
      return NextResponse.json({
        success: false,
        message: "No such user found"
      }, {status: 401});
    }

    return NextResponse.json({
      success: true,
      data: userInfo,
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


async function DELETE(req:NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const userID = searchParams.get("userID");
    const action = searchParams.get('action')
    const ids = searchParams.get('ids')?.split(",");

    // delete all users
    if(action === 'removeAll') {
      await User.deleteMany({});
      return NextResponse.json({
        success: true,
        message: "All users have been deleted",
      }, {status: 200})
    }

    // delete multiple users
    if(ids?.length) {
      await User.deleteMany({_id: {$in: ids}})
      return NextResponse.json({
        success: true,
        message: "users have been deleted",
        data: ids
      }, {status: 200})
    }

    // delete single user
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

    return NextResponse.json({
      success: true,
      message: "user has been deleted",
      data: deletedUser
    }, {status: 200})

  } catch (err:any) {
    console.log("Users Route Delete error",
      err.message)
    return NextResponse.json({
      success: false,
      message: err.message 
        || "Something went wrong"
    }, {status: 500});
  }
}


async function POST(req:NextRequest) {
  try {

    const body = await req.json()
    const {searchParams} = new URL(req.url);
    const action = searchParams.get('action')
    const {query} = body

    if(action == 'queryUser') {
      const res:(UserSchema | null) = await User.findOne(query)

      return NextResponse.json({
        success: true,
        message: 'user found',
        data: res
      }, {status: 200})
    }

    return NextResponse.json({
      success: false,
      message: 'required params are missing'
    }, {status: 400})

  } catch (err:any) {
    console.log("Users Route FilterQuery error",
      err.message)
    return NextResponse.json({
      success: false,
      message: err.message 
        || "Something went wrong"
    }, {status: 500});
  }
}



async function PATCH(req:NextRequest) {
  try {

    const updateQuery = await req.json()
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get("userId");

    if(!updateQuery || !userId) {
      return NextResponse.json({
        success: false,
        message: "Please send required params"
      }, {status: 400 })
    }

    const updatedUser: UserSchema | null =
			await User.findByIdAndUpdate(
        userId, 
        updateQuery, 
        {new: true,});

    return NextResponse.json({
      success: true,
      message: "user has been updated",
      data: updatedUser
    }, {status: 200})
    
  } catch (err:any) {
    console.log("Users Route PATCH error",
      err.message)
    return NextResponse.json({
      success: false,
      message: err.message 
        || "Something went wrong"
    }, {status: 500});
  }
}


export {
  handler as GET,
  POST,
  DELETE,
  PATCH
}