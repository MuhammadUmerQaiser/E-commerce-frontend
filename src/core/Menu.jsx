import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/Index";
import { totalItemsInCart } from "../helpers/CartHelper";
import { BsFillCartFill } from "react-icons/bs";

const Menu = () => {
  // to change the color of menu if it is on that page
  const location = useLocation();
  const navigate = useNavigate();
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
          <Link className="nav-link" to="/shop" style={isActive("/shop")}>
            Shop
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart" style={isActive("/cart")}>
            <BsFillCartFill />{" "}
            <sup>
              <small className="cart-badge">{totalItemsInCart()}</small>
            </sup>
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/user/dashboard"
              style={isActive("/user/dashboard")}
            >
              Dashbaord
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/admin/dashboard"
              style={isActive("/admin/dashboard")}
            >
              Dashbaord
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={isActive("/signin")}
              >
                Signin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={isActive("/signup")}
              >
                Signup
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => {
                signout(() => {
                  navigate("/signin");
                });
              }}
              style={{ cursor: "pointer", color: "#ffffff" }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
