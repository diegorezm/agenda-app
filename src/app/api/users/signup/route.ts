import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody

    const user = await User.findOne({ email })
    if (user) throw new Error("User already exists!")
    const salt = await bcryptjs.genSalt(10)
    const hashpwd = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username, 
      email,
      password: hashpwd
    })
    await newUser.save()
    return NextResponse.json({
      message: "User created!",
      success: true
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    },
      {
        status: 500
      })

  }
}
