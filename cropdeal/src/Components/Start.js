import React, { useState, useEffect } from 'react';
import './Start.css';
import { Link } from 'react-router-dom'; 

const Start = () => {
    const [backgroundImage, setBackgroundImage] = useState(0);

    const images = [
        'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        'url("https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        'url("https://media.istockphoto.com/id/1365305727/photo/asian-woman-use-tablet-to-check-vegetable-growing-information-in-the-garden.jpg?s=1024x1024&w=is&k=20&c=MUBlWCMzv5-IkPhRhqXVySdR3W4aFXerLAQOOiQXAxo=")',
        
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundImage((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="header" >
            
           
            <Link to="/login" className="link-button">
  Login
</Link>
<Link to="/signup" className="link-button">
  Signup
</Link>
<Link to="/about" className="link-button">
  About
</Link>

              
            <div className='content'>
            <h4 className="mandi-text">MANDI MARKET</h4>
            <p className="p-text">Buy / Sell Agricultural, Farming, Gardening, Livestock Products & Services in India</p>
        </div>
        </div>
    );
};

export default Start;
