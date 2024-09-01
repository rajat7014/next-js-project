import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}

// DATABASE CONNECTION
const connection: ConnectionObject = {} 

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }

    try{
// here problem connect kaha pr kare tb .env file banate h
     const db = await mongoose.connect(process.env.MONGODB_URL || '',{})

    connection.isConnected = db.connections[0].readyState

    console.log("DB connected successfully");
    }catch(error){

        console.log("database connecton failed",error);

        process.exit(1)
    }
}


export default dbConnect