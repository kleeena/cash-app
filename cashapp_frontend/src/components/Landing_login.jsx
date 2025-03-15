import React, {useState} from "react";
import {loginUser} from "../api/authService.js";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import './Landing_login.css'




function Landing_login() {

    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    
    
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ username, password });
           
            navigate("/dashboard"); // Redirect after login
        } catch (error) {
          setError("Invalid username or password");
        }
      };


      const handleRegisterClick = () => {
        navigate("/register"); // Redirect to register page
    };
    return(
        <>
            <Navbar/>
            <img src="/assets/Landing_login/Rectangle.svg" id="rectangle"></img>
            <img src="/assets/Landing_login/Rectangle-2.svg" id="rectangle-2"></img>
            <img src="/assets/Landing_login/Rectangle-3.svg" id="rectangle-3"></img>
            <div className="login">
                <h2 className="login-heading">Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" id="email" value={username} onChange={(e) => setUsername(e.target.value)}
  text="Email Address" placeholder="Username" required />
                    <input
                     type="password" id="password" placeholder="Password"
                     value={password}
                    onChange={(e) => setPassword(e.target.value)} required></input>
                    <button className="login-register-btn" type="submit">Login</button> 
                </form>
                         
            </div>
            <div className="group-384">
                <p>Don’t have an account?</p>
                <button 
                    className="login-register-btn" 
                    id="register-btn" 
                    onClick={handleRegisterClick} // Call function on click
                >Register</button>
            </div>

        </>
    );
}

export default Landing_login;
