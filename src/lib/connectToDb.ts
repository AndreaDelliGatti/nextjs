import mongoose from "mongoose";

const connection: { isConnected?: any } = {  };

export async function connectToDb() {
    try {
        if (connection.isConnected) {
            return;
        }
        
        const db = await mongoose.connect(process.env.MONGODB_URL!!)
        connection.isConnected = db.connection.readyState;
    }
    catch (e: any) {
        // console.log(e);
        throw new Error(e);
    }
}