import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
connect()
export async function GET(request : NextRequest){
  try {
    const reqBody = await request.json()
    const { password, email } = await reqBody
    const user = User.findOne({ email })
    const validPwd = await bcryptjs.compare(password, user.password)
    if(!user) throw new Error("User does not exist!")
    if(!validPwd) throw new Error("Invalid password!")
    const tokenData = { 
      id: user.id,
      username: user.username,
      email: user.email
    }
    const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET, {expiresIn: "1d"})
    const response = NextResponse.json({
      message: "Login successful!",
      success: true
    })
    response.cookies.set("token" , token, { httpOnly: true})
    return response

  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, {
      status:500
    })
  }
}
