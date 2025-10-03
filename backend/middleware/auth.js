import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authMiddleware = async (req,res,next) =>{
const {token} =req.headers;
if(!token){
    return res.json({success:false,message:"Not Authorized Login Again"})

}
try {
    const token_decode =jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId =token_decode.id;
    const user = await userModel.findById(req.body.userId);
    if (!user) {
        return res.json({success:false,message:"User not found"})
    }
    req.body.userRole = user.role;
    next();
} catch (error) {
    console.log(error);
res.json({success:false,message:"Error"})
}
}

export default authMiddleware;
