import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("📦 Database Connected Successfully".bgGreen.white);
    } catch (error) {
        console.error("❌ Database Connection Error:".bgRed.white, error.message);
    }
}