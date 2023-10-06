import React, { useState } from "react";

const RadioButton = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };
  return prices.map((price, i) => {
    return (
      <div key={i}>
        <input
          type="radio"
          name={price}
          onChange={handleChange}
          value={price._id}
          className="mr-2 ml-4"
        />
        <label className="form-check-label">{price.name}</label>
      </div>
    );
  });
};

export default RadioButton;
