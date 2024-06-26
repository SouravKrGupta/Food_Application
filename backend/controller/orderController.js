import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import sendMail from "../helpers/senMail.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cardData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price*100 ,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 100*100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Fetching user details and order details
    const user = await userModel.findById(req.body.userId);
    const orderDetails = await orderModel.findById(newOrder._id);

 // Composing email subject and text
 const subject = "Order Placed Successfully!";
 const productDetails = orderDetails.items.map(
   (item) => `${item.name} - Quantity: ${item.quantity}, Price: ₹${item.price}`
 ).join('\n');

 const text = `Dear ${user.name},\n\nYour order has been successfully placed.\n\nTotal Bill: ₹${orderDetails.amount+100}\n\nProduct Details:\n${productDetails}\n\nThank you for choosing us!\n\nBest regards,\nThe Jalpaan Express Team`;

    // Sending email
    sendMail(user.email, subject, text);
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
const verifyorder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: "true" });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// List orders for admin panel

const listOrders = async(req,res)=>{
try {
  const orders =await orderModel.find({});
  res.json({success:true,data:orders})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
}
}
// api for updating order status
const updateStatus =async(req,res)=>{
try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({success:true,message:"Status Updated"})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
}
}
export { placeOrder, verifyorder, userOrders ,listOrders,updateStatus};
