import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <div className="about-text">
      <p>
        Welcome to our crop selling website! We are dedicated to providing the
        best platform for farmers and buyers to connect and trade high-quality
        crops. Our mission is to promote sustainable and profitable agriculture
        practices and ensure fair prices for both farmers and consumers.
      </p>
      <p>
        At our core, we value transparency, reliability, and efficiency. We
        strive to create a seamless experience for our users, offering a diverse
        range of crops at competitive prices. Our user-friendly interface and
        secure payment system make the process of buying and selling crops
        convenient and secure for everyone.
      </p>
      <p>
        Whether you are a farmer looking to showcase your produce or a buyer
        seeking fresh, organic crops, our platform is designed to cater to your
        needs. Join our growing community today and be a part of the agricultural
        revolution.
      </p>
      <p>
        Explore our crops and start your journey <Link to="/login">here</Link>.
      </p>
    </div>
    </div>
  );
};

export default About;
