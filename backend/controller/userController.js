import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


// login user
const loginUser =async (req,res) =>{
 const {email,password} =req.body;
 try {
    const user =await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"User Doesn't exist"})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
    }
    const token = createToken(user._id);
    res.json({success:true,token});
 } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
 }
}
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser =async (req,res) => {
   const {name,password,email,phone,role} = req.body;
 // checking is user already exists
   try {
     const exists =await userModel.findOne({email});
     if (exists) {
         return res.json({success:false,message:"User already exists"})

     }
     // validating email format  & strong password
     if (!validator.isEmail(email)) {
         return res.json({success:false,message:"Please enter a vaild email"})

     }
     // Validating password strength
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     if (!passwordRegex.test(password)) {
         return res.json({ success: false, message: "Please enter a strong password (at least 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character)" });
     }
     // hashing user password
     const salt = await bcrypt.genSalt(10)
     const hashedpassword = await bcrypt.hash(password,salt);
     const newUser = new userModel({
         name:name,
         email:email,
         password:hashedpassword,
         phone:phone,
         role: role || 'user'  // Allow setting role, default to 'user'
     })
     const user = await newUser.save()
     const token  = createToken(user._id)
     res.json({success:true,token});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}


// Fetch all registered users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching users" });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select('-password');
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching profile" });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.body.userId,
      { name, phone },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating profile" });
  }
};

export {loginUser,registerUser,getUsers,getProfile,updateProfile}
