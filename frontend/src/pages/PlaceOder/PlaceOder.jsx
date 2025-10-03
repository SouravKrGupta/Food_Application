import React, { useContext,  useEffect,  useState } from "react";
import "./PlaceOder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
const PlaceOder = () => {
  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);

  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",

  })
 
  const onChangeHandler = (event)=>{
    const name =event.target.name;
    const value =event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const placeOrder =async (event) =>{
     event.preventDefault ();
     let orderItems =[];
     food_list.map((item)=>{
       if(cartItems[item._id]>0){
        let itemInfo =item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo)
       }
     })
    let orderData ={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      alert("Order placed successfully!");
      navigate('/myorders');
    }
    else{
      alert("Error placing order");
    }
  }
const navigate =useNavigate();
  useEffect(()=>{
if(!token){
navigate('/card')
}
else if(getTotalCartAmount()===0)
navigate('/card')
  },[token])
  return (
    <form  onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="mult-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          {/* <input required name="lastName" onClick={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" /> */}
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name"/>
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
         <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="mult-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="mult-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input  name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
      <div className="cart-total-details">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmount()}</p>   
      </div>
      <div className="cart-total-details">
          <p>Delivery Fee</p>

          <p>₹{getTotalCartAmount()==0?0:100}</p>
      </div>
      <hr />
      <div className="cart-total-details">
    <b>Total</b>
    <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+100}</b>
      </div>

    </div>
          <button type="submit">PLACE ORDER</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOder;
