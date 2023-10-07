import React from "react";
import moment from "moment";

const ViewProduct = ({ product }) => {
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-success mb-3">In Stock</span>
    ) : (
      <span className="badge badge-danger mb-3">Out of Stock</span>
    );
  };

  return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-6">
              <img
                src={`${process.env.REACT_APP_API_URL}/product/photo/${product._id}`}
                alt="Product"
                className="card-img"
                style={{ maxHeight: "400px" }}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">
                  Category: {product.category && product.category.name}
                </p>
                <p className="card-text">
                  Added on {moment(product.createdAt).fromNow()}
                </p>
                {showStock(product.quantity)}
                <br />
                <button className="btn btn-warning">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
