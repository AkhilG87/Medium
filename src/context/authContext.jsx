import axios from "axios";
import { React, createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const getAllData = async () => {
    const res = await axios.get("https://api-akhilg87.vercel.app/blogs");
    setData(res.data);
  };
  const login = async (inputs) => {
    const res = await axios.post(
      "https://api-akhilg87.vercel.app/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ setCurrentUser, currentUser, login, data, getAllData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
