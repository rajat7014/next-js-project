import {z} from "zod"


// zod code 

export const usernameValidation = z
.string()
.min(2,"Username must be atleast 2 characters")
.max(10," Username must be no more than 10 characters")
.regex(/^[a-zA-Z0-9]+$/,
    "Username must be contain special characters")

    export const signupSchema = z.object({
        username: usernameValidation,
        email: z.string().email({message:'invalid email address'}),
        password: z.string().min(8,{message:"Password must be atleast 8 characters"})
        
    })