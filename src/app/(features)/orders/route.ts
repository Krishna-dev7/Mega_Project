import { 
  NextResponse, 
  NextRequest 
} from "next/server";
import { useSession } from "next-auth/react";

const handler = async (req:NextRequest) => {
  try {

    const { data, status } = useSession();
    if(!status) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized user request"
      }, {status: 401});
    }

    // extract userId from data
    //  data.user._id
    // request db for orders
    // and send the obtain data to user
    // test using postman 
    // obtain bearer token from console.log on your vs code terminal
    
    
  } catch (error:any) {
    console.log("Something went wrong on Cart route", error.message)
    return NextResponse.json({
      success: false,
      message:  error.message || "someting went wrong"
    }, {status: 500});
  }
}


export {
  handler as GET
}