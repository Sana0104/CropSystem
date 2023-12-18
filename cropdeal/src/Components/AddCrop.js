import React, { useState } from "react";
import CropService from "../Services/CropService";
import "./AddCrop.css";
import { useNavigate } from "react-router-dom";

const AddCrop = () => {
  const navigate = useNavigate();
  const [crop, setCrop] = useState({
    cropName: "",
    cropType: "",
    description: "",
    price: 0,
    quantity: 0,
    sellerName:"",
    location: "",
    image: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCrop({ ...crop, [name]: value });
  };

  const submitCrop = (event) => {
    event.preventDefault();
    CropService.addCrop(crop)
      .then((response) => {
        setSuccessMessage("Crop Added Successfully");
        console.log(response.data);
        navigate({ pathname: '/farmer' })
      })
      .catch((error) => {
        console.error("Error adding crop: ", error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={submitCrop}>
        <div className="form-group">
          <label>Crop Name</label>
          <input
            type="text"
            placeholder="Crop Name"
            name="cropName"
            value={crop.cropName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Crop Type</label>
          <input
            type="text"
            placeholder="Crop Type"
            name="cropType"
            value={crop.cropType}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={crop.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={crop.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={crop.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>UploadedBy</label>
          <input
            type="text"
            placeholder="UploadedBy"
            name="sellerName"
            value={crop.sellerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={crop.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="text"
            placeholder="Image"
            name="image"
            value={crop.image}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <button type="submit">Add Crop</button>
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default AddCrop;
