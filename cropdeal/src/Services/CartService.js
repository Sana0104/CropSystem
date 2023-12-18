// CartService.js

import axios from 'axios';

const baseURL = 'http://localhost:9097'; 

const cartService = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

const CartService = {
  addToCart: (buyerId, cropId, cropsData) => {
    return cartService.post(`/transaction/buyCrops/${buyerId}/${cropId}`, cropsData);
  }
};

export default CartService;
