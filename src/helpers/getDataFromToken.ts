import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server';
export function getTokenData(request : NextRequest){
  try {
   const token = request.cookies.get("token")?.value || ""
   const decodedToken: any = jwt.verify(token,process.env.TOKEN_SECRET)
   return decodedToken.id
  } catch (error: any) {
    return error.message
  }
}
