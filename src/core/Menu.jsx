import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  // to change the color of menu if it is on that page
  const location = useLocation();
  const isActive = (path) => {
    if (location.pathname === path) {
      return { color: "#ff9900" };
    } else {
      return { color: "#ffffff" };
    }
  };
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive("/")}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signin" style={isActive("/signin")}>
            Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup" style={isActive("/signup")}>
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
