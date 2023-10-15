import React, { useEffect, useState } from "react";
import Layout from "../../core/Layout";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../../auth/Index";
import {
  getOrderByIdForAdmin,
  getStatusValuesForOrders,
  updateOrderStatus,
} from "../ApiAdmin";
import moment from "moment";

const AdminOrderDetails = () => {
  const params = useParams();
  const [order, setOrder] = useState();
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();
  const orderId = params.orderId;

  const loadOrderById = () => {
    getOrderByIdForAdmin(orderId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrder(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValuesForOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrderById();
    loadStatusValues();
  }, []);

  const handleStatusChange = (e, oId) => {
    updateOrderStatus(user._id, token, oId, e.target.value).then((data) => {
      if (data.error) {
        console.log("error in updating status");
      } else {
        loadOrderById();
      }
    });
  };

  const showStatusDropdown = () => {
    return (
      <select
        className="dropdown"
        onChange={(e) => handleStatusChange(e, order._id)}
      >
        <option value="">Update Status</option>
        {statusValues.map((value, index) => {
          return (
            <option
              value={value}
              key={index}
              className="dropdown-item"
              selected={order?.status === value}
            >
              {value}
            </option>
          );
        })}
      </select>
    );
  };

  const showOrderDetail = (order) => {
    return (
      <table className="order-info">
        <tr>
          <td>
            <b>Status</b>
          </td>
          <td>&nbsp; : &nbsp;</td>
          {showStatusDropdown()}
        </tr>
        <tr>
          <td>
            <b>Total</b>
          </td>
          <td>&nbsp; : &nbsp;</td>
          <td>
            <b>
              <u>${order?.amount}</u>
            </b>
          </td>
        </tr>
        <tr>
          <td>
            <b>Customer Name</b>
          </td>
          <td>&nbsp; : &nbsp;</td>
          <td>{order?.user.name}</td>
        </tr>
        <tr>
          <td>
            <b>Transaction Id</b>
          </td>
          <td>&nbsp; : &nbsp;</td>
          <td>{order?.transaction_id}</td>
        </tr>
        <tr>
          <td>
            <b>Address</b>
          </td>
          <td>&nbsp; : &nbsp;</td>
          <td>{order?.address}</td>
        </tr>
        <tr>
          <td>
            <b>Created At</b>
          </td>
          <td>&nbsp; : &nbsp;</td>
          <td>{moment(order?.createdAt).fromNow()}</td>
        </tr>
      </table>
    );
  };

  const showProductDetailsInOrder = (order) => {
    return (
      <div className="table-responsive">
        <table className="table table table-striped table-bordered">
          <thead>
            <tr>
              <td>No</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Sub Total</td>
            </tr>
          </thead>
          <tbody>
            {order?.products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.count}</td>
                  <td>${product.price * product.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Layout
      title="Order Details"
      description={`G'Day ${user.name}!, you can manage order ${orderId} here.`}
      className="container-fluid"
    >
      <div className="row">
        <div className="container mt-4">
          <div className="card">
            <div className="card-body">
            <h3 className="card-title mb-4 mt-2">Status: <u className="text-info">{order?.status}</u></h3>
              <div className="row">
                <div className="col-md-4 col-12">{showOrderDetail(order)}</div>
                <div className="col-md-8 col-12">
                  <h4>Order Detail</h4>
                  {showProductDetailsInOrder(order)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrderDetails;
