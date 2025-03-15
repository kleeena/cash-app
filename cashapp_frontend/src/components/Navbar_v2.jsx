import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar_v2.css";


function Navbar_V2() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");         // Remove user data
        localStorage.removeItem("access_token"); // Remove authentication token
        navigate("/"); // Redirect to landing page
    };

    return(
        <div className="navbar-box">
           <header className="navbar">
                <div className="user-info">
                    <div className="profile-img-container">
                        <img src="#"></img>
                    <p id="greeting">Good Evening!</p>
                    <p id="username-txt">{user?.username ? user.username.replace(/\b\w/g, c => c.toUpperCase()) : ""}</p>

                    </div> 
                </div>
                <div className="menu-container">
                    <button id="notification-btn">
                        <img src="assets/Navbar_2/Group 377.svg"></img>
                    </button>
                    <button id="message-btn">
                        <img src="assets/Navbar_2/Vector.svg"></img>
                    </button>
                    <button id="profile-btn" onClick={() => navigate("/dashboard")}>
                        <img src="assets/Navbar_2/Group 44.svg" alt="Profile" />
                    </button>

                    <button id="logout-btn" onClick={handleLogout}> {/* 🔹 Logout button */}
                        <img src="assets/Navbar_2/Group 375.svg"></img>
                    </button>
                </div>
                
           </header>
            
        </div>
    );

}

export default Navbar_V2;