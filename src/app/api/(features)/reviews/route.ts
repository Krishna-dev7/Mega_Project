import Review from "@/models/review.models";
import { NextRequest, NextResponse } from "next/server";

async function GET(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const action = searchParams.get('action');
    const productId = searchParams.get('productId');
    const reviewId = searchParams.get('reviewId');

    if(!action || !(productId || reviewId)) {
      return NextResponse.json({
        success: false,
        message: "required params are missing"
      }, {status: 200})
    }

    let result;
    if(action == "streamReviews") {
      result = await Review.find({productId}).populate("userId");
    }

    if(action== "getReview" && reviewId) {
      result = await Review.findById(reviewId);
    }

    return NextResponse.json({
      success: true,
      message: "received data",
      data: result
    }, {status: 200})
    
  } catch (err:any) {
    return NextResponse.json({
      success: false,
      message: err.message ||
        "something went wrong on get review route"
    }, {status: 500})
  }
}


async function POST(req: NextRequest) {
  try {
    const res = await req.json();
    const {
      userId,
      ratings,
      comment,
      productId,
      attachments
    } = res;

    const review = await Review.create({
      userId,
      ratings,
      comment,
      productId,
      attachments
    })

    if(!review) {
      return NextResponse.json({
        success: false,
        message: "something is missing in while creating review"
      }, {status: 400})
    }

    return NextResponse.json({
      success: true,
      message: "review created"
    }, {status: 200})

  } catch (err:any) {
    return NextResponse.json({
      success: false,
      message: err.message ||
        "something went wrong on get review route"
    }, {status: 500})
  }
}


async function DELETE(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    if(!id) {
      return NextResponse.json({
        success: false,
        message: "required params missing: id"
      }, {status: 500})
    }

    const deletedReview = await Review.findByIdAndDelete(id)

    if(!deletedReview) {
      return NextResponse.json({
        success: false,
        message: "Nothing to delete"
      }, {status: 200})
    }

    return NextResponse.json({
      success: true,
      message: "deleted review",
      data: deletedReview
    }, {status: 200})
    
  } catch (err:any) {
    return NextResponse.json({
      success: false,
      message: err.message ||
        "something went wrong on get review route"
    }, {status: 500})
  }
}


async function PATCH(req: NextRequest) {
  try {

    const body = await req.json();
    const {_id: id , rating, comment, attachments} = body;

    if(!id) { 
      return NextResponse.json({
        success: false,
        message: "required params missing: id"
      }, {status: 500})
    } 

    const updatedReview = await Review
      .findByIdAndUpdate(id, {$set: {rating, comment, attachments}}, {new: true});

    if(!updatedReview) {
      return NextResponse.json({
        success: false,
        message: "Nothing to update"
      }, {status: 200})
    }

    return NextResponse.json({
      success: true,
      message: "updated review",
      data: updatedReview
    }, {status: 200})
    
  } catch (err:any) {
    return NextResponse.json({
      success: false,
      message: err.message ||
        "something went wrong on get review route"
    }, {status: 500})
  }
}


export {
  GET,
  POST,
  DELETE,
  PATCH
}