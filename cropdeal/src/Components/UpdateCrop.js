import React, { useState, useEffect } from 'react';
import CropService from '../Services/CropService';
import { useNavigate, useParams, Link } from 'react-router-dom';

const UpdateCrop = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [crop, setCrop] = useState({
    cropName: '',
    cropType: '',
    description: '',
    price: 0,
    quantity: 0,
    sellerName:'',
    location: '',
    image: '',
  });

  useEffect(() => {
    fetchCropData();
  }, []);

  const fetchCropData = async () => {
    try {
      const response = await CropService.viewCrop(id);
      if (response && response.data) {
        setCrop(response.data);
      } else {
        console.error('Invalid data format for crop: ', response);
      }
    } catch (error) {
      console.error('Error fetching crop data: ', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCrop({ ...crop, [name]: value });
  };

  const updateCrop = async (event) => {
    event.preventDefault();
    try {
      const response = await CropService.updateCrop(id, crop);
      if (response && response.data) {
        console.log('Crop updated successfully');
        navigate(`/farmer`); // Navigate back to the farmer page
      } else {
        console.error('Invalid response after updating crop: ', response);
      }
    } catch (error) {
      console.error('Error updating crop: ', error);
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div
        style={{
          width: '30%',
          border: '1px solid #ddd',
          padding: '20px',
          backgroundColor: '#f9f9f9', /* Set your preferred background color here */
        }}
      >
         <Link to="/farmer" style={{ float: 'right' }}>
          Back
        </Link>
        <h2 style={{ textAlign: 'center' }}>Update Crop</h2>
        <form onSubmit={updateCrop}>
          <div className="form-group">
            <label>Crop Name</label>
            <input
              type="text"
              name="cropName"
              value={crop.cropName}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Crop Type</label>
            <input
              type="text"
              name="cropType"
              value={crop.cropType}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Crop Description</label>
            <input
              type="text"
              name="description"
              value={crop.description}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Crop Price</label>
            <input
              type="text"
              name="price"
              value={crop.price}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Crop Quantity</label>
            <input
              type="text"
              name="quantity"
              value={crop.quantity}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Uploaded By</label>
            <input
              type="text"
              name="sellerName"
              value={crop.sellerName}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={crop.location}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="text"
              name="image"
              value={crop.image}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group" style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Update Crop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCrop;
