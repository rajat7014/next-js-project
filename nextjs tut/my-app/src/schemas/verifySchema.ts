import {z} from "zod"


export const verifySchema = z.object({
    code: z.string().length(8,'verification code must be 8 digits')
})