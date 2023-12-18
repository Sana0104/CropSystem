import React, { useState, useEffect } from 'react';
import CropService from '../Services/CropService';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Farmer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Admin = ({ cart }) => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
 
  useEffect(() => {
    fetchAllCrops();
  }, []);

  const fetchAllCrops = async () => {
    try {
      const response = await CropService.getCrops();
      if (response && response.data && Array.isArray(response.data)) {
        setCrops(response.data);
      } else {
        console.error('Invalid data format for crops: ', response);
      }
    } catch (error) {
      console.error('Error fetching crops: ', error);
    }
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  

  const handleUsersClick = () => {
    navigate('/users');
  };
 

  return (
    <div>
      <nav className="navbar-farmer">
        <button className="user-button" onClick={handleUsersClick}>
          Users
        </button>
      </nav>
      <div className="crops-container-farmer">
        <h2>Crops Added By Farmers</h2>
        <div className="crop-rows-farmer">
          {crops.map((crop, index) => (
            <div
              key={crop.id}
              className="crop-box-farmer"
              style={{
                backgroundColor: generateRandomColor(),
                backgroundImage: `url(${crop.image})`,
              }}
            >
              <div className="crop-content-farmer">
                <p>
                  <strong>Id #</strong>
                  {crop.id}
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
                  <strong>Crop Quantity:</strong> {crop.quantity}
                </p>
                <p>
                  <strong>Uploaded By:</strong> {crop.sellerName}
                </p>
                <p>
                  <strong>Crop Location:</strong> {crop.location}
                </p>
               
              </div>
             
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
