import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import image from "../../assets/logo.png";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const { pathname } = useLocation();

  const clickHandler = async () => {
    await axios.post("https://api-rfe1.vercel.app/auth/logout", {
      withCredentials: true,
    });
    localStorage.setItem("user", "null");
    setCurrentUser(null);
  };

  const isActive = () => {
    {
      window.scrollY > 480 ? setActive(true) : setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, [active]);
  return (
    <div
      className={active || pathname !== "/blogs" ? "navbar active" : "navbar"}
    >
      <div className="container">
        <div className="logo" onClick={() => navigate("/blogs")}>
          <img src={image} alt="" />
        </div>
        <div className="right">
          <span className="ss">Your Blogs</span>
          <span className="ss">Membership</span>
          {!(pathname === "/blogs/new") && (
            <span
              className="ss"
              onClick={() => {
                navigate("/blogs/new");
              }}
            >
              Write
            </span>
          )}
          <span className="ss" onClick={clickHandler}>
            Logout
          </span>

          <div className="GetStarted">
            <img src={currentUser.pic} alt="" />
            <span>{currentUser.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
