import mongoose from "mongoose";
import { ConnectionStates } from "mongoose";

const connection: { isConnected: ConnectionStates } = { isConnected: ConnectionStates.uninitialized };

export async function connectToDb() {
    try {
        if (connection.isConnected == ConnectionStates.connected) {
            return;
        }
        
        const db = await mongoose.connect(process.env.MONGODB_URL!!)
        connection.isConnected = db.connection.readyState;
    }
    catch (e: any) {
        console.log(e);
        throw new Error(e);
    }
}