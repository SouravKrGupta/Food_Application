import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";

import "./Home.css";

const Home = ({ url }) => {
  const { token } = useContext(AdminContext);
  const [orderData, setOrderData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchOrderData(),
      fetchUserData()
    ]);
  };

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { token }
      });
      if (response.data.success) {
        const orders = response.data.data;
        setAllOrders(orders);
        setOrderData(orders.slice(0, 5)); // For table display
        setTotalOrders(orders.length);

        // Calculate total revenue
        const revenue = orders.reduce((sum, order) => sum + order.amount, 0);
        setTotalRevenue(revenue);
      } else {
        console.error("Error fetching order data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/users`, {
        headers: { token }
      });
      if (response.data.success) {
        const users = response.data.data;
        setAllUsers(users);
        setTotalUsers(users.length);
      } else {
        console.error("Error fetching user data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  return (
    <div className="home-container">
      <div className="left-column">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>Total Orders</h3>
              <p className="stat-number">{totalOrders}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Total Users</h3>
              <p className="stat-number">{totalUsers}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <p className="stat-number">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-column">
        <div className="table-card">
          <h3>📋 Recent Orders</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orderData.slice(0, 10).map((order, index) => (
                  <tr key={index}>
                    <td>{order.address?.firstName} {order.address?.lastName}</td>
                    <td>{order.items?.length || 0} items</td>
                    <td>₹{order.amount}</td>
                    <td>
                      <span className={`status ${order.status?.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.date || order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-card">
          <h3>👥 Recent Users</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.slice(0, 10).map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role ${user.role || 'user'}`}>
                        {user.role || 'User'}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt || user.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
