import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import Navbar_V2 from './Navbar_v2.jsx';
import Transaction from './Transaction.jsx';
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();


    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
   

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    console.error("No access token found");
                    return;
                }

                const response = await axios.get("https://cash-app-backend-eight.vercel.app/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
                setBalance(response.data.balance);
                localStorage.setItem("user", JSON.stringify(response.data));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    },[location.key] );

    const handleSendClick = () => {
        navigate("/send-funds");

    }
    const handleLoadClick = () => {
        navigate("/load-funds");

    }

    return(
        
        <div className="body">
                <Navbar_V2/>
            <div className="cards-container">
                        <div className="card-1">
                            <p className="balance-type">Fiat Balance</p>
                            <p className="balance-amount">${balance}</p>
                            <img src="assets/Dashboard/Group 1.svg"></img>
                        </div>
                        <div className="card-2"></div>
                        <button className="load-btn" onClick={handleLoadClick} >Load</button>
                        <button className="send-btn-2" onClick={handleSendClick}>Send</button>

            </div>
            <div className="section-line"></div>
            <div className="headings-container-1">
                <p>My Transaction</p>
                <p>Amount</p>
            </div>
            <Transaction/>
        </div>);
}
export default Dashboard;