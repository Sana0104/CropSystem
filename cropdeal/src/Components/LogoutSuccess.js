import React from 'react';
import { Link } from 'react-router-dom';
import './LogoutSucess.css'; // Import your CSS file

const LogoutSuccess = () => {
    return (
        <div className="container mt-5">
          <div className="login-container">
            <div className="text-center">
              <div className="oval-container">
                <div className="oval"></div>
                <div className="login-heading">CCA Cockpit</div>
              </div>
              <div className="powered-by-container">
                <div className="powered-by">powered by ETAP</div>
              </div>
            </div>
          </div>
          
          <div className="container">
            <p>You have successfully logged out. Thank you!</p>
            <Link to="/login">Go Back to Login Page</Link>
          </div>
        </div>

    
  );
};

export default LogoutSuccess;
