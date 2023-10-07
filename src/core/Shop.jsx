import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getAllCategories } from "../admin/ApiAdmin";
import { getFilteredProducts } from "./ApiCore";
import Checkbox from "../components/Checkbox";
import Card from "../components/Card";
import RadioButton from "../components/RadioButton";
import { prices } from "../components/FixedPriceRange";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
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

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.products);
        setSkip(0);
        setSize(data.size);
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
    loadFilteredResults(newFilters.filters);
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

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.products]);
        setSkip(toSkip);
        setSize(data.size);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load More
        </button>
      )
    );
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
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults?.map((product, i) => {
              return <Card key={i} product={product} />;
            })}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
}
