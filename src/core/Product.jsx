import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getSingleProduct, getRelatedProduct } from "./ApiCore";
import { useParams } from "react-router-dom";
import ViewProduct from "../components/ViewProduct";
import Card from "../components/Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState("");
  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    loadSingleProduct(productId);
  }, [productId]);

  const loadSingleProduct = (productId) => {
    getSingleProduct(productId).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setProduct(response);
        getRelatedProduct(response._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 70)
      }
      className="container-fluid"
    >
      <div className="container mt-5 mb-5">
        <ViewProduct product={product} />

        <div className="mt-5">
          <h3 className="mb-4">Related Products</h3>
          <div className="row">
            {relatedProduct?.map((pro, i) => {
              return <Card key={i} product={pro} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
