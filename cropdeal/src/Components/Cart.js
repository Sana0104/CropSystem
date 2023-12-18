

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import './Cart.css'; 

const Cart = () => {
 

  const navigate = useNavigate();
  const location = useLocation();
  const cartId = localStorage.getItem('cartId');

  const [crops, setCrops] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    fetchCropsByCartId(cartId);
  }, [cartId]);

  useEffect(() => {
    const total = crops.reduce((acc, crop) => acc + crop.quantity * crop.price, 0);
    setSubtotal(total);
  }, [crops]);

  const fetchCropsByCartId = async (cartId) => {
    try {
      const response = await axios.get(`http://localhost:9097/transaction/getCropsByCartId/${cartId}`);
      if (response && response.data) {
        setCrops(response.data);
      } else {
        console.error('Invalid data format for crops: ', response);
      }
    } catch (error) {
      console.error('Error fetching crops: ', error);
    }
  };

  const handleQuantityChange = (event, cropId) => {
    const newCrops = crops.map((crop) => {
      if (crop.id === cropId) {
        return { ...crop, quantity: parseInt(event.target.value) };
      }
      return crop;
    });
    setCrops(newCrops);
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const handleRemoveCrop = async (cropId) => {
    try {
      const response = await axios.delete(`http://localhost:9097/transaction/deleteCropFromCart/${cartId}/${cropId}`);
      if (response && response.status === 200) {
        fetchCropsByCartId(cartId);
      } else if (response && response.status === 404) {
        console.error('Crop not found in the cart');
      } else {
        console.error('Failed to delete the crop from the cart');
      }
    } catch (error) {
      console.error('Error deleting the crop from the cart: ', error);
    }
  };
  const handleProceedToCheckout = () => {
    navigate("/payment", { state: { totalAmount: subtotal, cartId: cartId } }); // Pass the cartId as location state
  };
  
  
  return (
    <div className="cart-container">
    <div className="subtotal-proceed-container">
      <div className="subtotal-box">
      <p className="subtotal-text">Subtotal: {subtotal}</p>
      </div>
      <button onClick={handleProceedToCheckout} className="proceed-button">
        Proceed to Checkout
      </button>
    </div>

      <div className="crops-container">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="crop-box"
            style={{
              backgroundColor: generateRandomColor(),
              backgroundImage: `url(${crop.image})`,
            }}
          >
            <div className="crop-content">
              <p>
                <strong>Crop id:</strong> {crop.id}
              </p>
              <p>
                <strong>Crop Name:</strong> {crop.cropName}
              </p>
              <p>
                <strong>Crop Type:</strong> {crop.cropType}
              </p>
              <p>
                <strong>Crop Description:</strong> {crop.description}
              </p>
              <p>
                <strong>Crop Price:</strong> {crop.price}
              </p>
              <p>
                <strong>Quantity:</strong>
                <select value={crop.quantity} onChange={(e) => handleQuantityChange(e, crop.id)}>
                  {[...Array(crop.quantity)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <strong>Uploaded By:</strong> {crop.sellerName}
              </p>
              <p>
                <strong>Crop Location:</strong> {crop.location}
              </p>
              <button onClick={() => handleRemoveCrop(crop.id)} className="remove-button">
  Remove
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
