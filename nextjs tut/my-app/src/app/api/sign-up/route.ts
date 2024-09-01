import dbConnect from "@/lib/dbConnect"
import UserModel from "@/app/model/user"
import bcrypt from "bcryptjs" 

import { sendVerificationEmail } from "@/helper/sendVerificationEmail"
import { messageSchema } from "@/schemas/messageSchema"

export async function POST(request: Request ){
    await dbConnect()

    try{

        const {username ,email,passwword} = await request.json()

        UserModel.fo

    }catch(error) {
        console.error("Error registering user",error)
        return Response.json(
            {
success:false,
message:'error registering user'
            },
            {
                status: 500
            }
        )
    }
}