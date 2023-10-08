import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";
import AddToCartButton from "./AddToCartButton";

const Card = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header name">{product.name}</div>
        <div className="card-body">
          <Image item={product} url="product" />
          <p>{product.description.substring(0, 70)}</p>
          <p>${product.price}</p>
          <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-primary mt-2 mb-2">
              View Product
            </button>
          </Link>
          <AddToCartButton className="btn btn-outline-warning mt-2 mb-2 ml-2" product={product} />
        </div>
      </div>
    </div>
  );
};

export default Card;
