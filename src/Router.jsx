import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import Shop from "./core/Shop";
import Cart from "./core/Cart";
import Product from "./core/Product";
import Checkout from "./core/Checkout";
import UserDashboard from "./user/UserDashboard";
import Profile from "./user/Profile";
import AdminDashboard from "./admin/AdminDashboard";
import CreateCategory from "./admin/category/CreateCategory";
import CreateProduct from "./admin/product/CreateProduct";
import AdminOrders from "./admin/order/AdminOrders";
import AdminOrderDetails from "./admin/order/AdminOrderDetails";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import ThankYou from "./core/ThankYou";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/signin" exact Component={Signin} />
        <Route path="/signup" exact Component={Signup} />
        <Route path="/shop" exact Component={Shop} />
        <Route path="/cart" exact Component={Cart} />
        <Route path="/checkout" exact Component={PrivateRoute}>
          <Route path="/checkout" exact Component={Checkout} />
        </Route>
        <Route path="/thank-you/:orderId" exact Component={ThankYou} />
        <Route path="/product/:productId" exact Component={Product} />
        <Route path="/user/dashboard" exact Component={PrivateRoute}>
          <Route path="/user/dashboard" exact Component={UserDashboard} />
        </Route>
        <Route path="/admin/dashboard" exact Component={AdminRoute}>
          <Route path="/admin/dashboard" exact Component={AdminDashboard} />
        </Route>
        <Route path="/admin/create/category" exact Component={AdminRoute}>
          <Route
            path="/admin/create/category"
            exact
            Component={CreateCategory}
          />
        </Route>
        <Route path="/admin/orders" exact Component={AdminRoute}>
          <Route path="/admin/orders" exact Component={AdminOrders} />
        </Route>
        <Route path="/admin/order/details/:orderId" exact Component={AdminRoute}>
          <Route path="/admin/order/details/:orderId" exact Component={AdminOrderDetails} />
        </Route>
        <Route path="/admin/create/product" exact Component={AdminRoute}>
          <Route path="/admin/create/product" exact Component={CreateProduct} />
        </Route>
        <Route path="/user/profile/:userId" exact Component={PrivateRoute}>
          <Route path="/user/profile/:userId" exact Component={Profile} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
