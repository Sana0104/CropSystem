import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchUsers.css';
const FetchUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9095/user/fetchAll');
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

 
  

  return (
    <div className="table-container">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>MobileNumber</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.userEmail}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.role}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchUsers;
