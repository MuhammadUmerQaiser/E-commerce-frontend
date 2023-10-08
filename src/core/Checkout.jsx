import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/Index";
import { getBraintreeClientToken, processPaymentForProduct } from "./ApiCore";
import {
  totalAmountOfCart,
  emptyCartAfterPayment,
} from "../helpers/CartHelper";
import DropIn from "braintree-web-drop-in-react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [data, setData] = useState({
    success: false,
    loading: false,
    error: "",
    clientToken: null,
    instance: "",
    address: "",
  });
  const navigate = useNavigate("");
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  //first we will create the token for client to get start the braintree transaction and
  //by using that token we are creating payemnt method form
  const getClientToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((response) => {
      if (response.error) {
        setData({ ...data, error: response.error });
      } else {
        setData({
          clientToken: response.clientToken,
        });
      }
    });
  };

  useEffect(() => {
    getClientToken(userId, token);
  }, []);

  //from client token i create payemnt form which will generate the instance from that
  //i am getting paymentMthod and generate the nonce then process the transaction in backend
  const paymentProcess = () => {
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((response) => {
        nonce = response.nonce;
        setData({ ...data, error: "" });
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: totalAmountOfCart(),
        };
        processPaymentForProduct(userId, token, paymentData)
          .then((res) => {
            setData({ ...data, success: res.success });
            emptyCartAfterPayment(() => {
              console.log("done");
              setData({ ...data, loading: false });
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null ? (
          <div>
            <DropIn
              options={{
                authorization: data.clientToken,
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
          </div>
        ) : null}
      </div>
    );
  };

  const showCheckoutButton = () => {
    return (
      <div className="text-center mt-5">
        <button
          className="btn btn-success btn-block"
          onClick={() => paymentProcess()}
        >
          Pay
        </button>
      </div>
    );
  };

  const showError = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = (loading) => {
    return (
      <div
        className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        Loading...
      </div>
    );
  };

  const showSuccess = (success) => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Thanks. Your payment was successful.
      </div>
    );
  };
  return (
    <Layout
      title="Checkout"
      description="Please pay the amount and enjoy the product."
      className="container-fluid"
    >
      <div className="container mt-5 mb-5">
        {showError(data.error)}
        {showLoading(data.loading)}
        {showSuccess(data.success)}
        {showDropIn()}
        {showCheckoutButton()}
      </div>
    </Layout>
  );
};

export default Checkout;
