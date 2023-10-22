import React, { useEffect, useState } from "react";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../auth/Index";
import {
  getAllCategories,
  getSingleProductById,
  updateProductDetail,
} from "../ApiAdmin";
import { Navigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const params = useParams();
  const productId = params.productId;
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const initCategory = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };

  const initProduct = () => {
    getSingleProductById(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
        });
        initCategory();
      }
    });
  };

  useEffect(() => {
    initProduct();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, error: "", createdProduct: "" });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProductDetail(productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          loading: false,
          error: "",
          createdProduct: data.name,
          category: "",
          shipping: "",
          quantity: "",
          redirectToProfile: true,
        });
      }
    });
  };

  const productForm = () => {
    return (
      <form className="mb-3">
        <h4>Upload Photo</h4>
        <div className="form-group">
          <label className="btn btn-outline-secondary">
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange("photo")}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange("name")}
            autoFocus
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={handleChange("description")}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={handleChange("price")}
            autoFocus
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select
            className="form-control"
            onChange={handleChange("category")}
            required
          >
            <option value="">Select Category</option>
            {categories &&
              categories.map((cat, i) => {
                return (
                  <option value={cat._id} key={i} selected={cat._id == category}>
                    {cat.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select
            className="form-control"
            onChange={handleChange("shipping")}
            required
          >
            <option value="">Select Shipping</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={handleChange("quantity")}
            autoFocus
            required
          />
        </div>
        <button className="btn btn-outline-primary" onClick={clickSubmit}>
          Update Product
        </button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: createdProduct ? "" : "none" }}
      >
        Product {createdProduct} is updated.
      </div>
    );
  };

  const showLoading = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        Loading...
      </div>
    );
  };

  const redirectToUser = () => {
    if (redirectToProfile) {
      return <Navigate to="/" />;
    }
  };

  return (
    <Layout
      title="Update a product"
      description={`G'Day ${user.name}!, ready to update a product?`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showError()}
          {showSuccess()}
          {productForm()}
          {redirectToUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
