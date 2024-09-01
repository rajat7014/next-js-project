import { resend } from "@/lib/resend";

import VerificationEmail from "./emails/verificationEmail";

import { apiResponse } from "@/types/apiResponse";
// import { CommandSucceededEvent } from "mongodb";

export async function sendVerificationEmail(
    email: string,
    usename:string,
    verifyCode:string
): Promise<apiResponse>{
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystery Message Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
          });
        return{success:true,message:"verification email send successfully"}

    } catch(emailError){
        console.error("Error sending verification email",emailError)
        return {success: false, message: "failed to send verification email"}
    }
}