import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";

export async function POST(request:Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    
     if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "User not authenticated"
            },
            { status: 401 }
        )
        
     }

     const userId = user._id
     const {acceptingMessages}  = await request.json()

     try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage: acceptingMessages},
            {new: true}

        )

        if(!updatedUser){
            return Response.json(
                {
                    success: false,
                    message: "Failed to update user to accept messages"
                },
                { status: 401 }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Message acceptance status updated successfully",
                updatedUser
            },
            { status: 200 }
        
        )

     } catch (error) {
        
        console.log('Failed to update user to accept messages')

        return Response.json(
            {
                success: false,
                message: "Failed to update user to accept messages"
            },
            { status: 500 }
        )
     }


}


// now use GET request

export async function GET(request: Request) {
    
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    
     if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "User not authenticated"
            },
            { status: 401 }
        )
        
     }

     const userId = user._id

     const foundUser = await UserModel.findById(userId)

    try {
         if (!foundUser) {
         
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status: 404 }
            )
         }
         return Response.json(
            {
                success: true,
                isAcceptingMessages: foundUser.isAcceptingMessage
            },
            { status: 200 }
        )
    } catch (error) {
        
        console.log('Failed to update user to accept messages')

        return Response.json(
            {
                success: false,
                message: "Error is getting message acceptance status"
            },
            { status: 500 }
        )
    }
}