import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://Food:Food12345@cluster0.zpwhhu3.mongodb.net/food-del').then(()=>
        console.log("DB Connected")
    );
}