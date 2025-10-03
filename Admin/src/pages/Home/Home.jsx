import React, { useState, useEffect, useContext } from "react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AdminContext } from "../../context/AdminContext";

import "./Home.css";

const Home = ({ url }) => {
  const { token } = useContext(AdminContext);
  const [foodData, setFoodData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userRoleData, setUserRoleData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orderStats, setOrderStats] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [foodStats, setFoodStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [orderStatusStats, setOrderStatusStats] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchFoodData(),
      fetchOrderData(),
      fetchUserData()
    ]);
    processAllStats();
  };

  const fetchFoodData = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`, {
        headers: { token }
      });
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

  const processOrderStats = (orders) => {
    // Group orders by date (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.date || order.createdAt).toISOString().split('T')[0];
        return orderDate === date;
      });

      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, order) => sum + order.amount, 0)
      };
    });
  };

  const processAllStats = () => {
    if (allOrders.length > 0) {
      const orderStatsData = processOrderStats(allOrders);
      setOrderStats(orderStatsData);

      const monthlyRevenueData = processMonthlyRevenue(allOrders);
      setMonthlyRevenue(monthlyRevenueData);

      const statusStats = processOrderStatusStats(allOrders);
      setOrderStatusStats(statusStats);
    }

    if (allUsers.length > 0) {
      const userStatsData = processUserStats(allUsers);
      setUserStats(userStatsData);

      // For pie chart, show user roles distribution
      const roleData = allUsers.reduce((acc, user) => {
        const role = user.role || 'user';
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {});

      const transformedUserRoleData = Object.entries(roleData).map(([role, count]) => ({
        name: role.charAt(0).toUpperCase() + role.slice(1),
        value: count
      }));

      setUserRoleData(transformedUserRoleData);
    }

    if (foodData.length > 0) {
      const foodStatsData = processFoodStats(foodData);
      setFoodStats(foodStatsData);

      const categoryStatsData = processCategoryStats(foodData);
      setCategoryStats(categoryStatsData);
    }
  };


  const processMonthlyRevenue = (orders) => {
    const monthlyStats = orders.reduce((acc, order) => {
      const month = new Date(order.date || order.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + order.amount;
      return acc;
    }, {});

    return Object.entries(monthlyStats).map(([month, revenue]) => ({
      month,
      revenue: Math.round(revenue)
    })).slice(-6);
  };

  const processOrderStatusStats = (orders) => {
    const statusStats = orders.reduce((acc, order) => {
      const status = order.status || 'Food Processing';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusStats).map(([status, count]) => ({
      name: status,
      value: count
    }));
  };

  const processFoodStats = (foods) => {
    return foods.map(food => ({
      name: food.name.length > 15 ? food.name.substring(0, 15) + '...' : food.name,
      price: food.price,
      category: food.category
    })).sort((a, b) => b.price - a.price).slice(0, 10);
  };

  const processCategoryStats = (foods) => {
    const categoryStats = foods.reduce((acc, food) => {
      acc[food.category] = (acc[food.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categoryStats).map(([category, count]) => ({
      name: category,
      value: count
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

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

        <div className="data-tables">
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
                  {orderData.slice(0, 5).map((order, index) => (
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
                  {allUsers.slice(0, 5).map((user, index) => (
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

      <div className="right-column">
        <div className="chart-card">
          <h3>📈 Order Trends (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={orderStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" fontSize={12} />
              <YAxis yAxisId="left" stroke="#667eea" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#764ba2" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => {
                  if (name === 'Revenue (₹)') return [`₹${value}`, name];
                  return [value, name];
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="orders"
                stroke="#667eea"
                strokeWidth={3}
                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                name="Orders"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#764ba2"
                strokeWidth={3}
                dot={{ fill: '#764ba2', strokeWidth: 2, r: 4 }}
                name="Revenue (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>💰 Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" fontSize={11} />
              <YAxis stroke="#666" fontSize={11} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#00C49F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>📋 Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={orderStatusStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                paddingAngle={3}
                label={({ name, value, percent }) => `${name}: ${value}`}
              >
                {orderStatusStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} orders`, name]} />
              <Legend fontSize={11} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
