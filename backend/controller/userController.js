import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import sendMail   from "../helpers/senMail.js";


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
    // sendMail(email,"Welcome to Jalpaan Express!",`Dear User,\n\nWelcome to Jalpaan Express! We are delighted to have you join our community.\n\nAt Jalpaan Express, we strive to offer you a delightful culinary experience with our authentic flavors and exceptional service.\n\nAs a valued member, you'll have access to our diverse menu of delectable dishes, exclusive offers, and exciting updates.\n\nIf you have any questions or need assistance, please don't hesitate to contact us. We're here to ensure your experience with Jalpaan Express is nothing short of excellent.\n\nOnce again, thank you for choosing Jalpaan Express. We look forward to serving you!\n\nBest regards,\nThe Jalpaan Express Team`)
      // Send welcome email upon successful login
      sendWelcomeEmail(user.email, user.name);
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
  const {name,password,email,phone} = req.body;
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
        phone:phone
    })
     const user = await newUser.save()
     const token  = createToken(user._id)
    //  sendMail(email,"Welcome to Jalpaan Express!",`Dear ${name},\n\nWelcome to Jalpaan Express! We are delighted to have you join our community.\n\nAt Jalpaan Express, we strive to offer you a delightful culinary experience with our authentic flavors and exceptional service.\n\nAs a valued member, you'll have access to our diverse menu of delectable dishes, exclusive offers, and exciting updates.\n\nIf you have any questions or need assistance, please don't hesitate to contact us. We're here to ensure your experience with Jalpaan Express is nothing short of excellent.\n\nOnce again, thank you for choosing Jalpaan Express. We look forward to serving you!\n\nBest regards,\nThe Jalpaan Express Team`)
    // Send welcome email upon successful registration
    sendWelcomeEmail(email, name);
     res.json({success:true,token});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}


// Welcome email function
const sendWelcomeEmail = (email, name) => {
  const subject = "Welcome to Jalpaan Express!";
  const text = `Dear ${name},\n\nWelcome to Jalpaan Express! We are delighted to have you join our community.\n\nAt Jalpaan Express, we strive to offer you a delightful culinary experience with our authentic flavors and exceptional service.\n\nAs a valued member, you'll have access to our diverse menu of delectable dishes, exclusive offers, and exciting updates.\n\nIf you have any questions or need assistance, please don't hesitate to contact us. We're here to ensure your experience with Jalpaan Express is nothing short of excellent.\n\nOnce again, thank you for choosing Jalpaan Express. We look forward to serving you!\n\nBest regards,\nThe Jalpaan Express Team`;

  sendMail(email, subject, text);
}

export {loginUser,registerUser}
