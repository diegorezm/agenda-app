import { getDataFromToken } from "@/helpers/getDataFromToken";
import Contacts from "@/models/contactModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request)
    const contacts = await Contacts.find({ author_id : userId })
    return NextResponse.json({
      success: true,
      contacts
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
