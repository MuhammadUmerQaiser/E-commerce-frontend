import React from "react";
import { Link } from "react-router-dom";

const Image = ({ item, url }) => {
  return (
    <div className="product-img">
      <img
        src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}`}
        className="mb-3"
        alt={item.name}
        style={{ maxHeight: "150px", maxWidth: "100%" }}
      />
    </div>
  );
};

export default Image;
