import dbConnect from "@/lib/dbConnect"
import UserModel from "@/app/model/user"
import bcrypt, { hash } from "bcryptjs" 

import { sendVerificationEmail } from "@/helper/sendVerificationEmail"
import { messageSchema } from "@/schemas/messageSchema"

export async function POST(request: Request ){
    await dbConnect()

    try{

        const {username ,email,passwword} = await request.json()

      const existinUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified:true
      })

if(existinUserVerifiedByUsername){
    return Response.json({
        success:false,
        messae:'username is already taken'
    },{status:400})
}

const existingUserByEmail = await UserModel.findOne({email})
const verifyCode = Math.floor(100000 + Math.random()*900000).toString()

if(existingUserByEmail){
    if(existingUserByEmail.isVerified){
        return Response.json({
            success: false,
            message: 'user already exist with this email'
        } , {status: 400})
    }else{
        const hashedPassword = await bcrypt.hash(passwword,10)
existingUserByEmail.password = hashedPassword;
existingUserByEmail.verifyCode = verifyCode
existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000)
await existingUserByEmail.save()
    }
}
else{
    const hashedPassword = await bcrypt.hash(passwword,10)
    const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours()+1)
    

    const newUser  =   new UserModel({
            username,
            email,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage: true,
            message: []
// iss message waale variable pr messages ho skat hai

        })
        await newUser.save()
}

// send verification email

const emailResponse = await sendVerificationEmail(
    email,
    username,
    verifyCode
) 

if(!emailResponse.success){
    return Response.json({
        success: false,
        message: emailResponse.message
    } , {status: 500})
}
return Response.json({
    success: false,
    message: "user registered successfully. Please verify your email"
} , {status: 201})

    } 
    catch(error) {
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