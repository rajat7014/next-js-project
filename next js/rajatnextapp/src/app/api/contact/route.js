// import dbConn from "@/Utils/dbConn"
// import Contact from "@/models/contact";
// import { NextResponse } from "next/server";

// export async function POST(req, res){
//     try{
//         const body = await req.json();
//         await dbConn();
//         await Contact.create(body);
//         return NextResponse.json({
//             message: "Message sent successfully!"
//         },{
//             status: 200
//         })
//     }catch(e){
//         return NextResponse.json(
//             {
//                 message: "Error sending message"
//             },
//             {
//                 status: 500
//             }
//         )
//     }
// }









import dbConn from "@/Utils/dbConn";
import Contact from "@/models/contact";
import {NextResponse} from "next/server";

export async function POST(req, res) {
    try {

        const body = await req.json();
        await dbConn();

        await Contact.create(body);

        return NextResponse.json({
            message:"Message sent successfully!"
        }, {
            status: 200
        })

    }catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}