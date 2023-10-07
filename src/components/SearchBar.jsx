import React, { useEffect, useState } from "react";
import { getAllCategories } from "../admin/ApiAdmin";
import { listSearchProducts } from "../core/ApiCore";
import Card from "./Card";

const SearchBar = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
    error: "",
  });

  const { categories, category, search, results, searched, error } = data;
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getAllCategories().then((response) => {
      if (response.error) {
        setData({ ...data, error: response.error });
      } else {
        setData({ ...data, categories: response });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const searchData = () => {
    if (search) {
      listSearchProducts({
        search: search || undefined,
        category: category,
      }).then((response) => {
        if (response.error) {
          setData({ ...data, error: response.error });
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchedMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} Products.`;
    }
    if (searched && results.length < 1) {
      return `No Products Found.`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        {searched && (
          <h4 className="mt-4 mb-4 alert alert-info">
            {searchedMessage(searched, results)}
          </h4>
        )}
        <div className="row">
          {results.map((product, i) => {
            return <Card key={i} product={product} />;
          })}
        </div>
      </div>
    );
  };

  const searchForm = () => {
    return (
      <form>
        <span className="input-group-text">
          <div className="input-group input-group-md">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">All</option>
                {categories.map((cat, i) => {
                  return (
                    <option key={i} value={cat._id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              placeholder="Search By Name"
              onChange={handleChange("search")}
            />
          </div>
          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-group-text" onClick={searchSubmit}>
              Search
            </button>
          </div>
        </span>
      </form>
    );
  };

  return (
    <div className="row mb-5">
      <div className="container">{searchForm()}</div>
      <div className="container-fluid mt-5">{searchedProducts(results)}</div>
    </div>
  );
};

export default SearchBar;
