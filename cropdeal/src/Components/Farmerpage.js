import React, { useState, useEffect } from 'react';
import CropService from '../Services/CropService';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Farmer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Farmerpage = ({ cart }) => {
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

  const handleAddCrop = () => {
    navigate('/addcrop');
  };
  const handleUpdateCrop = (id) => {
    navigate(`/updatecrop/${id}`);
};

const handleDeleteCrop = async (id) => {
    try {
        const response = await CropService.deleteCrop(id);
        if (response && response.data) {
            console.log('Crop deleted successfully');
           
            const updatedCrops = crops.filter((crop) => crop.id !== id);
            setCrops(updatedCrops);
        } else {
            console.error('Invalid response after delete operation: ', response);
        }
    } catch (error) {
        console.error('Error deleting crop: ', error);
    }
};

const handleProfile = () => {
  
  navigate('/profile');
};

  return (
    <div>
      <nav className="navbar-farmer">
        <button className="addcrop-button" onClick={handleAddCrop}>Add Crop</button>
        <button onClick={handleProfile} className="navbar-link">
          Profile
          </button>
      </nav>
      
      <div className="crops-container-farmer">
        <h2>Crops</h2>
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
                <div className="button-group">
    <button className="update-button" onClick={() => handleUpdateCrop(crop.id)}>
      Update
    </button>
    <button className="delete-button" onClick={() => handleDeleteCrop(crop.id)}>
      Delete
    </button>
  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Farmerpage;
