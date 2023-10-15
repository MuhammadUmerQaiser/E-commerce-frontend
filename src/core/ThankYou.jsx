import React from "react";
import { Link, useParams } from "react-router-dom";
import thankyou from "../assets/thankyou.jpg";
import "../css/thankyou.css";

const ThankYou = () => {
  const params = useParams();
  return (
    <div className="thank-you-page">
      <div className="content-container">
        <div className="left-content">
          <div className="thank-you-card">
            <div className="card-header">
              <h1>Thank You for Your Purchase!</h1>
            </div>
            <div className="card-body">
              <p>Your order has been successfully placed.</p>
              <p>
                Order Number:{" "}
                <span className="order-number">#{params.orderId}</span>
              </p>
              <p>Your items will be shipped shortly.</p>
              <h2>What's Next?</h2>
              <ul>
                <li>Keep an eye on your email for order updates.</li>
                <li>Visit our website for more products and promotions.</li>
              </ul>
              <p className="return-home">
                Explore more amazing products on our <Link to="/">Shop</Link>.
              </p>
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="image-container">
            <img src={thankyou} alt="Thank You Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
