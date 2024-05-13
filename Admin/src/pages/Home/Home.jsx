import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";

import "./Home.css";

const Home = ({ url }) => {
  const [foodData, setFoodData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetchFoodData();
    fetchOrderData();
    fetchUserData();
  }, []);

  const fetchFoodData = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoodData(response.data.data);
      } else {
        console.error("Error fetching food data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrderData(response.data.data);
      } else {
        console.error("Error fetching order data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/users`);
      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        console.error("Error fetching user data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <div className="container">
      <div className="food-data">
      <div className="graph">
        <h2>Food Data</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            width={1000}
            height={400}
            data={foodData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="price"
              stackId="1"
              barSize={20}
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="name"
              stackId="1"
              barSize={20}
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      </div>
     <div className="order-data">
     <div className="graph">
        <h2>Order Data</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart width={1000} height={400} data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="address.firstName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            <Line type="monotone" dataKey="items.length" stroke="#8884d8" />
            {/* <Line type="monotone" dataKey="address.phone" stroke="#8884d8" /> */}
          </LineChart>
        </ResponsiveContainer>
      
      </div>
     </div>
<div className="user-data">
<div className="graph">
        <h2>User Data</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart width={1000} height={400} data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="email" fill="#8884d8" />
            <Bar dataKey="phone" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
</div>
     
      
    </div>
  );
};

export default Home;
