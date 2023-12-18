import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './YourOrders.css';
const YourOrders = ({ buyerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrdersByBuyerId();
  }, []);

  const storedBuyerId = localStorage.getItem('id');

  const fetchOrdersByBuyerId = async () => {
    try {
      const response = await axios.get(`http://localhost:9092/payments/getAllOrdersByBuyerId/${storedBuyerId}`);
      if (response && response.data) {
        setOrders(response.data);
      } else {
        console.error('Invalid data format for orders: ', response);
      }
    } catch (error) {
      console.error('Error fetching orders: ', error);
    }
  };

  return (
    <div className="your-orders-container">
      <h2 className="container-title">Your Orders</h2>
      {orders.length > 0 ? (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.paymentId} className="order-item">
              <h3>Payment ID: {order.paymentId}</h3>
              <p>Total Amount: {order.totalAmount}</p>
              <p>Order Date: {order.orderDate}</p>
              <p>Order Status: {order.orderStatus}</p>
              {order.crops && order.crops.length > 0 && (
                <ul className="crops-list">
                  Crops Bought:
                  {order.crops.map((crop, index) => (
                    <li key={index} className="crop-item">
                      <p><strong>Crop Name:</strong> {crop.cropName}</p>
                      <p><strong>Seller Name:</strong> {crop.sellerName}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-orders">No orders available.</p>
      )}
    </div>
  );
};

export default YourOrders;