import React, { useState } from "react";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../auth/Index";
import { createCategory } from "../ApiAdmin";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setSuccess(false)
    setCategoryName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, categoryName).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setCategoryName('')
      }
    });
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Category Name</label>
          <input
            type="text"
            className="form-control"
            value={categoryName}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
        <button className="btn btn-outline-primary" onClick={clickSubmit}>Create Category</button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        Category Name should be unique
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Category {categoryName} is created.
      </div>
    );
  };

  return (
    <Layout
      title="Add a new category"
      description={`G'Day ${user.name}!, ready to add a new category?`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {categoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
