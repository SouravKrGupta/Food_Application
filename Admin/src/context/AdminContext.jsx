import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext(null);

const AdminContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email, password) => {
    const response = await axios.post(url + "/api/user/login", { email, password });
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("adminToken", response.data.token);
      setIsLoggedIn(true);
      return { success: true };
    } else {
      return { success: false, message: response.data.message };
    }
  };

  const register = async (name, email, password, phone) => {
    const response = await axios.post(url + "/api/user/register", { name, email, password, phone, role: 'admin' });
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("adminToken", response.data.token);
      setIsLoggedIn(true);
      return { success: true };
    } else {
      return { success: false, message: response.data.message };
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem("adminToken");
      if (storedToken) {
        try {
          // Validate token by making a test request
          const response = await axios.get(`${url}/api/user/profile`, {
            headers: { token: storedToken }
          });
          if (response.data.success) {
            setToken(storedToken);
            setIsLoggedIn(true);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem("adminToken");
            setIsLoggedIn(false);
          }
        } catch (error) {
          // Token validation failed, remove it
          localStorage.removeItem("adminToken");
          setIsLoggedIn(false);
        }
      }
    };

    validateToken();
  }, []);

  const contextValue = {
    url,
    token,
    isLoggedIn,
    login,
    register,
    logout,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;