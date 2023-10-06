import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checkedCategoryId, setCheckedCategoryId] = useState([]);

  const handleToggle = (catId) => () => {
    //it will return -1 if categoryId is not in array
    const currentCategoryCheck = checkedCategoryId.indexOf(catId);
    const newCheckedCategoryId = [...checkedCategoryId];
    //if categoryId not in array then add or else remove it
    if (currentCategoryCheck === -1) {
      newCheckedCategoryId.push(catId);
    } else {
      newCheckedCategoryId.splice(catId, 1);
    }
    setCheckedCategoryId(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };
  return categories.map((cat, i) => {
    return (
      <li className="list-unstyled" key={i}>
        <input
          type="checkbox"
          onChange={handleToggle(cat._id)}
          value={checkedCategoryId.indexOf(cat._id === -1)}
          className="form-check-input"
        />
        <label className="form-check-label">{cat.name}</label>
      </li>
    );
  });
};

export default Checkbox;
