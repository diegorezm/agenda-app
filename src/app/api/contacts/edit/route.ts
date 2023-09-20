import Contacts from "@/models/contactModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { name, phone_number, email, _id } = reqBody
    const contact = await Contacts.findOne({ _id: _id })
    if (!contact) throw new Error("Contact not found!")
    contact.name = name
    contact.phone_number = phone_number
    contact.email = email
    contact.save()
    return NextResponse.json({
      message: "Contact edited!",
      success: true
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    },{
      status: 500
    })

  }
}
