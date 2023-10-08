import React from "react";
import { addItemToCart } from "../helpers/CartHelper";
import { useNavigate } from "react-router-dom";

const AddToCartButton = ({ className, product }) => {
    const navigate = useNavigate();
  const addToCart = () => {
    addItemToCart(product, () => {
        navigate('/cart');
    });
  };
  return (
    <button onClick={addToCart} className={className}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
