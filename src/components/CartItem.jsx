import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { updateItemInCart, removeItemFromCart } from "../helpers/CartHelper";

const CartItem = ({ item }) => {
  const [count, setCount] = useState(item.count);

  const handleItemChange = (productId) => (event) => {
    setCount(
      event.target.value < 1
        ? 1
        : event.target.value <= item.quantity
        ? event.target.value
        : item.quantity
    );
    if (event.target.value >= 1 && event.target.value <= item.quantity) {
      updateItemInCart(productId, event.target.value);
    }
  };
  return (
    <>
      <td>{item.name}</td>
      <td>${item.price}</td>
      <td>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleItemChange(item._id)}
          />
        </div>
      </td>
      <td>${item.price * count}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => removeItemFromCart(item._id)}
        >
          <AiFillDelete />
        </button>
      </td>
    </>
  );
};

export default CartItem;
