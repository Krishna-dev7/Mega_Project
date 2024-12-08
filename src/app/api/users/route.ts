import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({
        message: "Hey buddy, we recently don't have any users",
    }, {
        status: 200
    })
}