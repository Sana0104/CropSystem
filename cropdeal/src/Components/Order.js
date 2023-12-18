import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [order, setOrder] = useState(null);
  const paymentId = localStorage.getItem('paymentId');
  const storedAddress = JSON.parse(localStorage.getItem('userAddress'));
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentId) {
      fetchOrderDetails();
    }
  }, [paymentId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:9092/payments/getOrderByPaymentId/${paymentId}`);
      if (response && response.data) {
        setOrder(response.data);
        localStorage.setItem('crops', JSON.stringify(response.data.crops));
      } else {
        console.error('Invalid data format for order details: ', response);
      }
    } catch (error) {
      console.error('Error fetching order details: ', error);
    }
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLogoutClick = () => {
    navigate('/login');
  };

  if (!order) {
    return <div>Loading...</div>;
  }
  if (!storedAddress) {
    return <div>No address information available</div>;
  }

  return (
    <div className="order-containers">
      <div className="page-buttons">
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
      <h2>Order Details</h2>
      <div className="order-details">
        <p><strong>Payment ID:</strong> {order.paymentId}</p>
        <p><strong>Total Amount:</strong> {order.totalAmount}</p>
        <p><strong>Order Date:</strong> {order.orderDate}</p>
        <p><strong>Order Status:</strong> {order.orderStatus}</p>
      </div>
      <div className="crops-containers">
        <h2>Crops Bought</h2>
        {order.crops.map((crop) => (
          <div key={crop.id}>
            <p><strong>Crop Name:</strong> {crop.cropName}</p>
            <p><strong>Seller Name:</strong> {crop.sellerName}</p>
          </div>
        ))}
      </div>
      <div className="shippingaddress-containers">
        <h2 className="shipping-address-header">Shipping Address</h2>
        <div className="shipping-address">
          <p>
            {storedAddress.houseNumber}, {storedAddress.area}, {storedAddress.state}, {storedAddress.city} - {storedAddress.pinCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
