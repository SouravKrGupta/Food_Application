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
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./Home.css";

const Home = ({ url }) => {
  const [foodData, setFoodData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

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
        setTotalOrders(response.data.data.length);
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
        // Transforming user data for PieChart
        const transformedUserData = response.data.data.map(user => ({
          name: user.name,
          value: 1 // Assuming we want to count each user equally
        }));
        setUserData(transformedUserData);
        setTotalUsers(response.data.data.length);
      } else {
        console.error("Error fetching user data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="home-container">
      <div className="left-column">
        <div className="container">
          <div className="card">
            <h1>Total Orders</h1>
            <p>{totalOrders}</p>
          </div>
          <div className="card">
            <h1>Total Users</h1>
            <p>{totalUsers}</p>
          </div>
        </div>

        <div className="box">
          <div className="food-data">
            <div className="graph">
              <h2>Food Data</h2>
              <ResponsiveContainer width="95%" height={250}>
                <AreaChart
                  width={1000}
                  height={400}
                  data={foodData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="category"
                    stackId="1"
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
              <ResponsiveContainer width="95%" height={250}>
                <LineChart width={1000} height={400} data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="address.firstName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                  <Line type="monotone" dataKey="items.length" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="user-data">
        <div className="graph">
          <h2>User Data</h2>
          <ResponsiveContainer width="95%" height={400}>
            <PieChart>
              <Pie
                data={userData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
