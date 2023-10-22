import React, { useEffect, useState } from "react";
import Layout from "../../core/Layout";
import { isAuthenticated } from "../../auth/Index";
import { deleteProduct, getAllProductsList } from "../ApiAdmin";
import moment from "moment";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const { user, token } = isAuthenticated();
  const [productsList, setProductsList] = useState([]);

  const loadProduct = () => {
    getAllProductsList()
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setProductsList(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const destroyProduct = (productId) => {
    deleteProduct(productId, user._id, token)
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          loadProduct();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <Layout
      title="Product"
      description={`G'Day ${user.name}!, Manage your products`}
      className="container-fluid"
    >
      <div className="row col-md-8 offset-md-2">
        <h3 className="mb-3 mt-3">All Products List</h3>
        <table className="table mt-4 mb-4">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((product, index) => (
              <tr key={index}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{moment(product.createdAt).fromNow()}</td>
                <td>
                  <Link
                    to={`/admin/update/product/${product._id}`}
                    className="btn btn-outline-primary"
                  >
                    View
                  </Link>
                  <span
                    className="btn btn-outline-danger ml-3"
                    onClick={() => destroyProduct(product._id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default CreateProduct;
