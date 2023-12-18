// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Start from './Components/Start';
import LogoutSuccess from './Components/LogoutSuccess';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import AddCrop from './Components/AddCrop';
import UpdateCrop from './Components/UpdateCrop';
import About from './Components/About';
import Cart from './Components/Cart';
import Payment from './Components/Payment'
import Farmerpage from './Components/Farmerpage';
import Order from './Components/Order';
import Admin from './Components/Admin';
import FetchUsers from './Components/FetchUsers';
import YourOrders from './Components/YourOrders';
import Profile from './Components/Profile';
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]); // Initialize the cart state here

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} />} />
        <Route
          path="/home"
          element={<Home setCart={setCart} cart={cart} />} // Pass the setCart function and the cart state to the Home component
        />
        <Route
          path="/farmer"
          element={<Farmerpage setCart={setCart} cart={cart} />} // Pass the setCart function and the cart state to the Home component
        />
        <Route path="/start" element={<Start />} />
        <Route path="/addcrop" element={<AddCrop />}></Route>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} /> {/* Pass the cart state and setCart function to the Cart component */}
        <Route path="/about" element={<About />} />
        <Route path="/updatecrop/:id" element={<UpdateCrop />} />
      
        <Route path="/logout-success" element={<LogoutSuccess />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<FetchUsers />} />
        <Route path="/yourorder" element={<YourOrders />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </Router>
  );
};

export default App;
