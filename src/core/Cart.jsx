import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getCartItems, totalAmountOfCart } from "../helpers/CartHelper";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/Index";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, [cartItems]);

  const showCartItems = () => {
    return (
      <div className="container mt-5">
        <h2>Your Cart has {cartItems.length} Items.</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, i) => (
              <tr key={i}>
                <CartItem item={item} />
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right">
                Total:
              </td>
              <td>${totalAmountOfCart()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  const noItemMessage = () => {
    return (
      <h2>
        Your Cart is empty. <br /> <Link to="/shop">Continue Shopping</Link>
      </h2>
    );
  };

  const showCheckoutButton = () => {
    return (
      <div className="text-center">
        {isAuthenticated() ? (
          <button className="btn btn-outline-primary">
            Proceed to Checkout
          </button>
        ) : (
          <Link to="/signin">
            <button className="btn btn-outline-success">
              Sign In to Checkout
            </button>
          </Link>
        )}
      </div>
    );
  };
  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add, remove, checkout or continue shopping"
      className="container-fluid"
    >
      <div className="container mt-5 mb-5">
        {cartItems.length > 0 ? showCartItems() : noItemMessage()}
        {cartItems.length > 0 ? showCheckoutButton() : ''}
      </div>
    </Layout>
  );
};

export default Cart;
