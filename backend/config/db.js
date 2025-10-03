import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://Food:Food12345@cluster0.zpwhhu3.mongodb.net/food-del');
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
    }
}