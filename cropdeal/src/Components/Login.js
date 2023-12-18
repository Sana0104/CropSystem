import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../Services/UserService";
import './login.css';

export default function Login() {
    const auth = localStorage.getItem("id");
    const [user, setUser] = useState({
        emailId: "",
        password: "",
    });

    const changeHandle = (e) => {
        setUser((oldUser) => ({
            ...oldUser,
            [e.target.name]: e.target.value,
        }));
    };

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(user);
        UserService.login(user)
            .then((response) => {
                const userData = response.data; 
                console.log("Response data:", userData); 
    
                const role = userData.role; 
                console.log("Role: ", role); 
    
                if (role === "Dealer") {
                    navigate("/home");
                } else if (role === "Farmer") {
                    navigate("/farmer");
                } else if 
                    (role==="Admin"){
                        navigate("/admin");
                    }
                    else{
                        navigate("/")
                    }
                
    
                alert("*****Login Successful*****");
                localStorage.setItem("id", userData.id);
            })
            .catch((error) => {
                alert(JSON.stringify(error.response.data));
            });
    };
    
    
    return (

        <div className="containers">
            <div className="form-containers">
                <div className="forms-images">
                    <img src='https://media.istockphoto.com/id/1414494138/photo/portrait-of-smiling-agronomist-with-digital-tablet-amidst-corn-crops-in-farm.webp?b=1&s=170667a&w=0&k=20&c=e1uoO3CERNl16C0tIlNT7wbNXnAtUi8-XPB5q9gdb5Q=' alt="Form Image" className="login-image" />
                </div>
                <div className="forms">
                    <h2>Login Account</h2>
                    <form className="mt-5" onSubmit={submitHandler}>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-forms-label">  Email Id  </label>
                            <div className="col-sm-10">
                                <input type="email" onChange={changeHandle} name="emailId" value={user.userEmailId} placeholder="siraj@example.com" className="forms-control" id="inputEmail3" required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-forms-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" onChange={changeHandle} name="password" value={user.userPassword} placeholder="8 Alpha-Numeric Character" className="forms-control" id="inputPassword3" required />
                            </div>
                        </div>
                        <div className="text-centers">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                        <div className="text-centers mt-5"> 
                            Want to Create a New Account <Link to="/signup">click here!</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
