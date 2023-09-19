import Contacts from "@/models/contactModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { _id } = reqBody
    const contact = Contacts.findOne({ _id: _id })
    if (!contact) throw new Error("Contact not found!")
    await contact.deleteOne({ _id: _id })
    return NextResponse.json({
      message: "Contact deleted!",
      success: true
    })
  } catch (error:any) {
    return NextResponse.json({
      error: error.message
    },
      {
        status: 500
      })

  }

}
