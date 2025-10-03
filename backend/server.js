// we are using ES6 feature
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import colors from 'colors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'

import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000;


//middleware
app.use(express.json())
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
  credentials: true
}));
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'.bgMagenta.white));
//db connection
connectDB();

//api end point
app.use("/api/food",foodRouter)
app.use("/image",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.get("/",(req,res)=>{
res.send("API Working")
})
app.listen(port,()=>{
    console.log(`🚀 Server Started on http://localhost:${port}`.bgCyan.white);
})
