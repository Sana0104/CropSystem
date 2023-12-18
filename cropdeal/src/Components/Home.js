import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const storedCartId = localStorage.getItem('cartId');
  const [cartId, setCartId] = useState(storedCartId);
  const [buyerId, setBuyerId] = useState('');

  useEffect(() => {
    fetchAllCrops();
  }, []);

  useEffect(() => {
    const storedBuyerId = localStorage.getItem('id');
    setBuyerId(storedBuyerId);
  }, []);
  const handleLogout = () => {
   
    navigate('/yourorder');
  };
  const handleProfile = () => {
   
    navigate('/profile');
  };
  const handleOrder = () => {
   
    navigate('/login');
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const fetchAllCrops = async () => {
    try {
      const response = await axios.get('http://localhost:9091/crops/viewAllCrops');
      if (response && response.data && Array.isArray(response.data)) {
        const filteredCrops = response.data.filter((crop) => !cart.find((item) => item.id === crop.id));
        setCrops(filteredCrops);
      } else {
        console.error('Invalid data format for crops: ', response);
      }
    } catch (error) {
      console.error('Error fetching crops: ', error);
    }
  };

  const handleAddToCart = async (crop) => {
    try {
      const currentCartId = cartId || generateCartId();
      const isCropInCart = cart.some((item) => item.id === crop.id);
  
      if (isCropInCart) {
        alert('Crop is already in the cart!');
        return;
      }
  
      const payload = {
        cartId: currentCartId,
        cropId: crop.id,
      };
  
      const response = await axios.post(
        `http://localhost:9097/transaction/buyCrops/userId/${buyerId}/cropId/${crop.id}`,
        payload
      );
  
      if (response.status === 200) {
        const newCart = [...cart, { ...crop, quantity: 1 }];
        setCart(newCart);
        setCartId(currentCartId);
        localStorage.setItem('cartId', currentCartId);
        setCartCount((prevCount) => prevCount + 1);
        alert('Crop added to the cart successfully!');
        
      } else {
        alert('Failed to add crop to the cart. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding crop to the cart: ', error);
      alert('Failed to add crop to the cart. Please try again later.');
    }
  };
  
  
  const handleQuantityChange = (event, crop) => {
    const { value } = event.target;
    const updatedCrops = crops.map((item) => {
      if (item.id === crop.id) {
        return { ...item, quantity: parseInt(value) };
      }
      return item;
    });
    setCrops(updatedCrops);
  };

  const generateCartId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoGenCartId = '';
    for (let i = 0; i < 10; i++) {
      autoGenCartId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoGenCartId;
  };
  const [searchInput, setSearchInput] = useState('');
  const [searchInputName, setSearchInputName] = useState('');
  
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  
  const handleSearchInputNameChange = (event) => {
    setSearchInputName(event.target.value);
  };
  
  const filteredCrops = crops.filter(
    (crop) =>
      crop.cropType.toLowerCase().includes(searchInput.toLowerCase()) &&
      crop.cropName.toLowerCase().includes(searchInputName.toLowerCase())
  );
  
  
  
  return (
    <div>
      <nav className="navbar">
      <div className="navbar-links">
     <div>
      <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} /> ({cart.reduce((total, item) => total + item.quantity, 0)})
          </Link></div>
      
          <button onClick={handleLogout} className="navbar-link">
          Your Orders
          </button>
          <button onClick={handleProfile} className="navbar-link">
          Profile
          </button>
          <button onClick={handleOrder} className="navbar-logout">
            Logout
          </button>
        </div>
       
      </nav>
     
      <div className="crops-container">
  <h2>Crops</h2>
  <div className="search-inputs">
    <input
      type="text"
      placeholder="Search by crop type..."
      value={searchInput}
      onChange={handleSearchInputChange}
    />
    <input
      type="text"
      placeholder="Search by crop name..."
      value={searchInputName}
      onChange={handleSearchInputNameChange}
    />
  </div>
  <div className="crop-rows">
    {filteredCrops.map((crop, index) => (
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
                {/* <select value={crop.quantity} onChange={(event) => handleQuantityChange(event, crop)}>
                  {Array.from({ length: crop.quantity }, (_, i) => i + 1).map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select> */}
                 <p>
                <strong>Uploaded By:</strong> {crop.sellerName}
              </p>
                <p>
                  <strong>Crop Location:</strong> {crop.location}
                </p>

                <button className="cart-btn" onClick={() => handleAddToCart(crop)}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
