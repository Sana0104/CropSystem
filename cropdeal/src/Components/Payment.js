import React, { useState } from 'react';
import './Payment.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalAmount, cartId } = location.state || { totalAmount: 0, cartId: '' };
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const storedAddress = JSON.parse(localStorage.getItem('userAddress'));
  const storedBuyerId = localStorage.getItem('id');
  const [paymentDetails, setPaymentDetails] = useState({
    totalAmount: totalAmount,
    paymentMode: '',
    cardNumber: '',
    bankName: '',
    ifscCode: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      totalAmount: paymentDetails.totalAmount,
      paymentMode: paymentDetails.paymentMode,
      paymentStatus: paymentDetails.paymentStatus,
      bankAccount: {
        cardNumber: paymentDetails.cardNumber,
        bankName: paymentDetails.bankName,
        ifscCode: paymentDetails.ifscCode
      },
      buyerId: storedBuyerId,
      cartId: cartId
    };

    axios
      .post(`http://localhost:9092/payments/addPayment/${storedBuyerId}/${cartId}`, payload)
      .then((response) => {
        console.log('Payment details submitted successfully:', response.data);
        setIsPaymentSuccessful(true);
        localStorage.setItem('paymentId', response.data.paymentId);
        setTimeout(() => {
          setIsPaymentSuccessful(false);
          navigate('/order');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error submitting payment details:', error);
      });
  };

  if (!storedAddress) {
    return <div>No address information available</div>;
  }
 
  
  
  
  

  return (
    <div className="payment-container">
      <div className="address-box">
        <h1>Delivery Address</h1>
        <div className="address-container">
          <p>
            {storedAddress.houseNumber}, {storedAddress.area}, {storedAddress.state}, {storedAddress.city} - {storedAddress.pinCode}
          </p>
        </div>
      </div>
      <div className="payment-form-container">
        <h1>Payment Details</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="totalAmount"
            value={paymentDetails.totalAmount}
            onChange={handleInputChange}
            placeholder="Total Amount"
            required
            readOnly // Added the readOnly attribute to make the field read-only
          />
         <select
            name="paymentMode"
            value={paymentDetails.paymentMode}
            onChange={handleInputChange}
            required
            style={{ width: "100%", height: "40px" }} // Custom styles for the dropdown
          >
            <option value="">Select Payment Mode</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Credit Card">Credit Card</option>
          </select>
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            placeholder="Card Number"
            required
          />
          <input
            type="text"
            name="bankName"
            value={paymentDetails.bankName}
            onChange={handleInputChange}
            placeholder="Bank Name"
            required
          />
          <input
            type="text"
            name="ifscCode"
            value={paymentDetails.ifscCode}
            onChange={handleInputChange}
            placeholder="IFSC Code"
            required
          />
          <button type="submit">Submit Payment</button>
        </form>
      </div>
      {isPaymentSuccessful && (
                <div className="popup-container">
                    <div className="popup-content">
                        <span className="success-symbol">✔</span>
                        <p>Payment Successful!</p>
                    </div>
                </div>
            )}
    </div>
  );
};

export default Payment;
