import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders", {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err.message);
      });
  }, []);

  return (
    <div className="orders">
      <h2>Orders ({orders.length})</h2>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
          <a href="/" className="btn">Get started</a>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price}</td>
                <td style={{ color: order.mode === "BUY" ? "green" : "red" }}>
                  {order.mode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
