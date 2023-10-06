import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getAllCategories } from "../admin/ApiAdmin";
import Checkbox from "../components/Checkbox";
import RadioButton from "../components/RadioButton";
import { prices } from "../components/FixedPriceRange";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [error, setError] = useState("");
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrices(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    setMyFilters(newFilters);
  };

  const handlePrices = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter By Categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => {
                handleFilters(filters, "category");
              }}
            />
          </ul>

          <h4>Filter By Price Range</h4>
          <div>
            <RadioButton
              prices={prices}
              handleFilters={(filters) => {
                handleFilters(filters, "price");
              }}
            />
          </div>
        </div>
        <div className="col-8">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
}
