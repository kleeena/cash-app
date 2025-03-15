import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import './Landing.css'


function Landing() {
    const navigate = useNavigate(); // Initialize navigate function

    const handleLogin = () => {
        navigate("/login"); // Redirect to login page
    };

    return(
        <>
        <Navbar/>
        <div className="div-1">
            <h1>Do more with your money</h1>
            <p>Send and spend, bank*, and buy stocks or bitcoins</p>
            <button className="download_btn" onClick={handleLogin}>Login</button>         </div>
        <div className="div-2">
            <img src="/assets/Ellipse 3.png" id="ellipse-3"></img>
            <img src="/assets/Ellipse 4.png" id="ellipse-4"></img>
            <img src="/assets/Ellipse 5.png" id="ellipse-5"></img>
            <img src="/assets/Vector.png" id="vector"></img>
            <img src="/assets/Vector-1.png" id="vector-1"></img>
            <img src="/assets/Rectangle-1.png" id="rectangle-1"></img>
            <img src="/assets/iPhone14-portrait 1.png" id="iphone-1"></img>
            <img src="/assets/Rectangle.png" id="rectangle-blur"></img>
            <img src="/assets/iPhone 14-portrait 2.png" id="iphone-2"></img>
            <img src="/assets/Group 350.png" id="group-350"></img>
            <img src="/assets/Group 349.png" id="group-349"></img> 
            <img src="/assets/Rectangle-3.png" id="rectangle-3-blur"></img>
            <img src="/assets/Rectangle-2.png" id="rectangle-2-cone"></img>
            <img src="/assets/Group.png" id="group"></img>
            <img src="/assets/Group 359.svg" id="group-359"></img>
                    
                    
            </div>

        </>
        
    )

}

export default Landing;