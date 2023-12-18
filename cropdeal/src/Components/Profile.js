import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
const Profile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const storedUserId = localStorage.getItem('id');

  useEffect(() => {
    fetchUserById();
  }, []);

  const fetchUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:9095/user/fetch/${storedUserId}`);
      if (response && response.data) {
        setUser(response.data);
      } else {
        console.error('Invalid data format for user: ', response);
      }
    } catch (error) {
      console.error('Error fetching user: ', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setUpdatedUser({ ...user });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:9095/user/update/${user.userEmail}`, updatedUser);
      if (response && response.status === 200) {
        setIsEditing(false);
        fetchUserById();
      }
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:9095/user/deleteuser/${storedUserId}`);
      if (response && response.status === 200) {
        
      }
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="profile-container">
      {isEditing ? (
        <div className="edit-form">
          <input type="text" name="userName" value={updatedUser.userName} onChange={handleInputChange} placeholder="User Name" />
          <input type="text" name="userEmail" value={updatedUser.userEmail} onChange={handleInputChange} placeholder="User Email" />
          <input type="text" name="mobileNumber" value={updatedUser.mobileNumber} onChange={handleInputChange} placeholder="Mobile Number" />
          <input type="password" name="userPassword" value={updatedUser.userPassword} onChange={handleInputChange} placeholder="User Password" />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div className="user-details">
          <h2>Username: {user.userName}</h2>
          <p>Email: {user.userEmail}</p>
          <p>Mobile Number: {user.mobileNumber}</p>
          <p>User Password: {user.userPassword}</p>
       
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Profile;







