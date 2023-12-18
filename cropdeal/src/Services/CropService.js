// CropService.js

import axios from 'axios';

const baseURL = 'http://localhost:9091';

const cropService = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

const CropService = {
  getCrops: () => {
    return cropService.get('/crops/viewAllCrops');
  },
  addCrop: (cropData) => {
    return cropService.post('/crops/addCrop', cropData);
  },
  updateCrop: (id, cropData) => {
    return cropService.put(`/crops/updateCrop/${id}`, cropData);
  },
  viewCrop: (id) => {
    return cropService.get(`/crops/viewCropById/${id}`);
  },
  deleteCrop: (id) => {
    return cropService.delete(`/crops/deleteCropById/${id}`);
  },
};

export default CropService;
