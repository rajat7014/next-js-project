import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { decode } from "punycode";
import { use } from "react";
import { NextResponse } from 'next/server';

export async function POST(request: Request){
    await dbConnect() 

    try {
      const {username, code} = await request.json() 
      console.log(username.username);
      console.log(code);
      
       

      const decodeUsername = decodeURIComponent(username.username)
      const user = await UserModel.findOne({username: decodeUsername})

      if (!user) {
        return Response.json(
            {
                success: false,
                message: "User not found"
            },
            { status: 500 }
        )
      }


      const isCodeValid = user.verifyCode === code
      const isCodeNotExpired = new Date(user.verifyCodeExpiry)>new Date()

      if (isCodeValid && isCodeNotExpired) {
        user.isVerified = true
        await user.save()

        return Response.json(
            {
                success: false,
                message: "Account Verified successfullly"
            },
            { status: 200 }
        )
      } else if(!isCodeNotExpired){
        return Response.json(
            {
                success: false,
                message: "Verification code is expired, Please signup again"
            },
            { status: 400 }
        )
      } else{
        return Response.json(
            {
                success: false,
                message: "Incorrect verifictaon code"
            },
            { status: 400 }
        )
      }
       
    } catch (error) {
        
        console.error(" Error verifying user", error)
        return Response.json(
            {
                success: false,
                message: "Error verifying user"
            },
            { status: 500 }
        )
    }
}


