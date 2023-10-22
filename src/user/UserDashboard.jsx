import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/Index";
import { Link } from "react-router-dom";
import { getUserPurchaseHistoryDetails } from "./ApiUser";
import moment from "moment";

const UserDashboard = () => {
  const [userPurchaseHistory, setUserPurchaseHistory] = useState([]);
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const init = (userId, token) => {
    getUserPurchaseHistoryDetails(userId, token).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setUserPurchaseHistory(res);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase History</h3>
        {userPurchaseHistory.length > 0 ? (
          <table className="table mt-4 mb-4">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Quantity</th>
                <th>Pucrhased Date</th>
              </tr>
            </thead>
            <tbody>
              {userPurchaseHistory.map((history, index) => {
                return (
                  <>
                    {history.products.map((product, i) => {
                      return (
                        <tr key={i}>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.count}</td>
                          <td>{moment(product.createdAt).fromNow()}</td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        ) : <h3 className="ml-4 mb-4 mt-4">There is no history of User</h3>}
      </div>
    );
  };

  const userLinks = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/user/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Layout
      title="Dashboard"
      description={`G'Day ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-3">{userLinks()}</div>
        <div className="col-md-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
