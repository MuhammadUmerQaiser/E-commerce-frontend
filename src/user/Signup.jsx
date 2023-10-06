import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signUpUser } from "../auth/Index";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    //pass the fields as an object
    signUpUser({ name, email, password })
      .then((data) => {
        if (data && data.error) {
          setSuccess(false);
          setError(data.error);
        } else {
          setName("");
          setEmail("");
          setPassword("");
          setError("");
          setSuccess(true);
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
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            className="form-control"
            onChange={(e) => {
              setName(e.target.value);
              setError(false);
            }}
          />
        </div>
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

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        New account is created. Please <Link to="/signin">Signin</Link>
      </div>
    );
  };
  return (
    <Layout
      title="Signup Page"
      description="Node React E-commerce Signup Page"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
