import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/Index";
import { Navigate, useParams } from "react-router-dom";
import {
  getUserData,
  updateUserDataInLocalStorage,
  updateUserProfile,
} from "./ApiUser";

const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });
  const { token } = isAuthenticated();
  const params = useParams();
  const userId = params.userId;

  const { name, email, password, error, success } = values;

  const init = () => {
    getUserData(userId, token)
      .then((res) => {
        if (res.error) {
          setValues({ ...values, error: true });
        } else {
          setValues({
            ...values,
            name: res.name,
            email: res.email,
          });
        }
      })
      .catch((err) => {
        setValues({ ...values, error: true });
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, success: false, [name]: e.target.value });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    updateUserProfile(userId, token, userData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: true });
        } else {
          updateUserDataInLocalStorage(data, () => {
            setValues({
              ...values,
              success: true,
              name: data.name,
              email: data.email,
            });
          });
        }
      })
      .catch((err) => {
        setValues({ ...values, error: true });
      });
  };

  const profileUpdateForm = (name, email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("name")}
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChange("email")}
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            value={password}
          />
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={(e) => updateProfile(e)}
        >
          Update
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
        An error occured, try again.
      </div>
    );
  };

  const showPassword = (success) => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Profile Updated Successfully.
      </div>
    );
  };

  return (
    <Layout
      title="Profile"
      description={`You can update your profile`}
      className="container col-md-8 offset-md-2"
    >
      <h2 className="mb-4">Update Profile</h2>
      {showError()}
      {showPassword(success)}
      {profileUpdateForm(name, email, password)}
    </Layout>
  );
};

export default Profile;
