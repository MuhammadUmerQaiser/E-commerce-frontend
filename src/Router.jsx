import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/signin" exact Component={Signin} />
        <Route path="/signup" exact Component={Signup} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
