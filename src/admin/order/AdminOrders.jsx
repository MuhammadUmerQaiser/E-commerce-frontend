import React, { useEffect, useState } from "react";
import Layout from "../../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/Index";
import { getAllOrdersListForAdmin } from "../ApiAdmin";
import moment from "moment";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    getAllOrdersListForAdmin(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const messageOfOrdersLength = (orders) => {
    return orders.length < 1 ? (
      <h1 className="text-danger mb-2">Orders List, No Orders</h1>
    ) : (
      <h1 className="text-danger mb-2">
        Orders List, Total Orders: {orders.length}
      </h1>
    );
  };

  return (
    <Layout
      title="Orders"
      description={`G'Day ${user.name}!, you can manage all the orders here.`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {messageOfOrdersLength(orders)}
          <table className="table mt-4 mb-4">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>${order.amount}</td>
                  <td className="badge">{order.status}</td>
                  <td>{moment(order.createdAt).fromNow()}</td>
                  <td>
                    <Link
                      to={`/admin/order/details/${order._id}`}
                      className="btn btn-outline-primary"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
