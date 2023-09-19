import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.has("token")
    return NextResponse.json({
      message: "Token found!",
      token
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    })

  }

}
