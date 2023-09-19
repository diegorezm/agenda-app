import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Contact from "@/models/contactModel"
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const _id = await getDataFromToken(request)
    const user = await User.findOne({ _id: _id })

    if (!user) throw new Error("You are not supposed to do that!")

    const { name, email, phone_number } = reqBody
    const newContact = new Contact({
      name,
      email,
      phone_number,
      author_id: _id,
      author: user.username
    })
    newContact.save()
    return NextResponse.json({
      message: "Contact created!",
      success: true
    })

  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    },
      {
        status: 500
      }
    )

  }

}
