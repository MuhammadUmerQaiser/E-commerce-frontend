import React, { useState } from "react";
import Layout from "../core/Layout";
import { Navigate } from "react-router-dom";
import { signInUser, authenticateUser, isAuthenticated } from "../auth/Index";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const { user } = isAuthenticated();

  const submitForm = (e) => {
    e.preventDefault();
    //pass the fields as an object
    setLoading(true);
    signInUser({ email, password })
      .then((data) => {
        if (data && data.error) {
          setLoading(false);
          setRedirectToReferrer(false);
          setError(data.error);
        } else {
          authenticateUser(data, () => {
            setLoading(false);
            setRedirectToReferrer(true);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            id="email"
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            className="form-control"
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
          />
        </div>
        <button className="btn btn-primary mb-5" onClick={submitForm}>
          Submit
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

  const showLoading = () => {
    if (loading) {
      return (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      );
    }
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    if(user){
      return <Navigate to='/' />
    }
  };
  return (
    <Layout
      title="Signin Page"
      description="Node React E-commerce Signin Page"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showLoading()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
