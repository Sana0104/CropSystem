import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";
import './SignUp.css';
import Payment from "./Payment";
import { FaAngleDown } from 'react-icons/fa';
export default function SignUp() {
  const navigate = useNavigate();
  const [tempPassword, setTempPassword] = useState("");
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    mobileNumber: "",
    userPassword: "",
    role: "Farmer",
    address: {
      city: "",
      pinCode: "",
      state: "",
      houseNumber: "",
      area: ""
    }
  });
  
  const showPayment = true;

  const changeHandle = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [fieldName, subFieldName] = name.split(".");
      setUser((oldUser) => ({
        ...oldUser,
        [fieldName]: { ...oldUser[fieldName], [subFieldName]: value }
      }));
    } else {
      setUser((oldUser) => ({
        ...oldUser,
        [name]: value
      }));
    }
  };
  const validateForm = () => {
    // Basic validation for name, allowing only alphabets
    if (!/^[a-zA-Z]+$/.test(user.userName)) {
      alert("User Name should contain only alphabets");
      return false;
    }

   
   

    return true;
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (tempPassword === user.userPassword) {
      if (validateForm()) {
        const userToRegister = { ...user };
        localStorage.setItem("userAddress", JSON.stringify(user.address));
        UserService.register(userToRegister)
          .then((r) => {
            alert("Registration Successful!");
            localStorage.setItem("id", r.data.id);
            navigate("/login");
          })
          .catch((e) => {
            alert(JSON.stringify(e.response.data));
          });
      }
    } else {
      alert("Passwords do not match");
    }
  };

  const [showAddress, setShowAddress] = useState(false);
  return (
    <div className="containerss">
      <div className="formss-containerss">
        <div className="formss-image">
          <img src="https://media.istockphoto.com/id/1494718161/photo/young-farmer-uses-her-tablet-in-the-hay-field.webp?b=1&amp;s=170667a&amp;w=0&amp;k=20&amp;c=nrI4StAxY6CEOe8iXXZ7mBKMndvYpms-shaULbUDDLY=" alt="Form Image" className="register-image" />
        </div>
        <div className="formss">
          <h2>Create Account</h2>
          <form className="mt-5" onSubmit={submitHandler}>
            <div className="formss-group">
              <label htmlFor="inputName">User Name</label>
              <input type="text" className="formss-control" name="userName" onChange={changeHandle} value={user.userName} placeholder="Siraj " required />
            </div>
            <div className="formss-group">
              <label htmlFor="inputPhone">Mobile Number</label>
              <input type="text" className="formss-control" name="mobileNumber" onChange={changeHandle} value={user.mobileNumber} placeholder="8421295665" required />
            </div>
            <div className="formss-group">
              <label htmlFor="inputEmail">Email</label>
              <input type="email" className="formss-control" name="userEmail" onChange={changeHandle} value={user.userEmail} placeholder="siraj@example.com" required />
            </div>
            <div className="formss-group">
              <label htmlFor="inputPassword">Password</label>
              <input type="password" className="formss-control" name="userPassword" onChange={changeHandle} value={user.userPassword} placeholder="8 Alpha-Numeric Characters Long" required />
            </div>
            <div className="formss-group">
              <label htmlFor="inputPassword1">Confirm Password</label>
              <input type="password" className="formss-control" name="tempPassword" onChange={(e) => setTempPassword(e.target.value)} value={tempPassword} placeholder="8 Alpha-Numeric Characters Long" required />
            </div>
            <div className="formss-group">
              <label htmlFor="inputRole">Role</label>
              <select
                className="formss-control"
                name="role"
                onChange={changeHandle}
                value={user.role}
              >
                <option value="Farmer">Farmer</option>
                <option value="Dealer">Dealer</option>
              </select>
            </div>
            <div className="formss-group">
  <label htmlFor="inputAddress" onClick={() => setShowAddress(!showAddress)}>Address <FaAngleDown className="dropdown-icon" /></label>
  {showAddress && (
    <div>
      <div className="formss-control">
        <label htmlFor="inputCity">City</label>
        <input
          type="text"
          name="address.city"
          onChange={changeHandle}
          value={user.address.city}
          placeholder="City"
          required
        />
      </div>
      <div className="formss-control">
        <label htmlFor="inputPinCode">Pin Code</label>
        <input
          type="text"
          name="address.pinCode"
          onChange={changeHandle}
          value={user.address.pinCode}
          placeholder="Pin Code"
          required
        />
      </div>
      <div className="formss-control">
        <label htmlFor="inputState">State</label>
        <input
          type="text"
          name="address.state"
          onChange={changeHandle}
          value={user.address.state}
          placeholder="State"
          required
        />
      </div>
      <div className="formss-control">
        <label htmlFor="inputHouseNumber">House Number</label>
        <input
          type="text"
          name="address.houseNumber"
          onChange={changeHandle}
          value={user.address.houseNumber}
          placeholder="House Number"
          required
        />
      </div>
      <div className="formss-control">
        <label htmlFor="inputArea">Area</label>
        <input
          type="text"
          name="address.area"
          onChange={changeHandle}
          value={user.address.area}
          placeholder="Area"
          required
        />
      </div>
    </div>
  )}
</div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success">Sign Up</button>
            </div>
          </form>
          <div className="text-center mt-2">
            Already have an Account? <Link to="/login">Click here!</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
