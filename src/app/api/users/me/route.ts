import { connect } from "@/dbconfig/dbconfig";
import { getTokenData } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect()

export async function GET(request : NextRequest){
  try {
    const _id = await getTokenData(request)
    const user = await User.findOne({_id: _id}).select("-password")
    if(!user) throw new Error("User not found!")
    return NextResponse.json({
      message: "User found!",
      user
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    },{
      status:500
    })
  }
}
