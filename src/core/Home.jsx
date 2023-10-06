import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./ApiCore";
import Card from "../components/Card";
import "../style.css";

export default function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState("");

  const loadProductBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductByArrival();
    loadProductBySell();
  }, []);
  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce Home Page"
      className="container-fluid"
    >
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => {
          return <Card product={product} key={i} />;
        })}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => {
          return <Card product={product} key={i} />;
        })}
      </div>
    </Layout>
  );
}
