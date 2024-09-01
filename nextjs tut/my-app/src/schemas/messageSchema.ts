import { Content } from "next/font/google"
import {z} from "zod"


export const messageSchema = z.object({
    Content: z
    .string()
    .min(10,{message:'content atleat 10 characters'})
    .max(300,{message:'content must be no longer than 300 characters'})

})