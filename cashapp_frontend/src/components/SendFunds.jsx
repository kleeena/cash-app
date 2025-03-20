import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./sendfunds.css";
import Navbar_V2 from "./Navbar_v2";


function SendFund() {   


    const navigate = useNavigate();

    // State for input fields
    const [recipientId, setRecipientId] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [payees, setPayees] = useState([]);
    const [selectedPayee, setSelectedPayee] = useState("");


    useEffect(() => {
        const fetchPayees = async () => {
            try {
                const response = await axios.get("https://cash-app-backend-eight.vercel.app/users/payees/", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                });
                setPayees(response.data);  // Store fetched payees in state
            } catch (error) {
                console.error("Error fetching payees:", error);
            }
        };
    
        fetchPayees();
    }, []);
    
    // Handle dropdown selection
    const handlePayeeSelect = (event) => {
        setRecipientId(event.target.value);  // Auto-fill recipient ID
    };
    
    // Handle API request on button click
    const handleSendMoney = async () => {
        setError(""); // Reset error
        setLoading(true); // Show loading state

        // Validate input fields
        if (!recipientId || !amount) {
            setError("Please enter both recipient account number and amount.");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                setError("No access token found. Please log in.");
                setLoading(false);
                return;
            }

            const response = await axios.post(
                "https://cash-app-backend-eight.vercel.app/transactions/send-money/",
                {
                    recipient_id: recipientId,
                    amount: amount,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // ✅ Check if recipientId exists in the database
        const checkResponse = await axios.get(`https://cash-app-backend-eight.vercel.app/users/check-account/${recipientId}/`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!checkResponse.data.exists) {
            alert("Account number does not exist in the database.");
            setLoading(false);
            return;
        }

            // ✅ Successfully sent money
            alert("Funds sent successfully!");
            navigate("/dashboard");
        } catch (err) {
            console.error("Error sending money:", err);
            setError(err.response?.data?.message || "Failed to send money.");
        } finally {
            setLoading(false);
        }

        
    };
    return(
        <div className="root">
        <Navbar_V2/>
        <div className="frame-1">
            <div className="text-wrapper">Send Funds</div>
            <div className="line-stroke"></div>
        </div>
        
        <div className="select-payment">Select payment method,</div>
        <div className="frame-353">Fiat</div>
        <div className="line-stroke-2"></div>
        <div className="field-container">
            <div className="payee-select">
                <p>Select a Payee</p>
                        {/* Dropdown for selecting a payee */}
                        <select onChange={handlePayeeSelect} value={recipientId}>
        <option value="">Select a Payee</option>
        {payees.map((payee) => (
            <option key={payee.id} value={payee.id}>
                {payee.username} ({payee.id})
            </option>
        ))}
    </select>

            
            </div>
            <div className="account-num-container">
                    <p>Account Number</p>
                    {/* Input field (auto-updates based on selection) */}
                    <input
        type="text"
        placeholder="Enter account number or select a payee"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}  // Allow manual entry
    />
            </div>
            <div className="amount-container">
                <p>Amount</p>
                <input
                        type="text"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
            </div>
        </div>
        <button className="send-btn-1" onClick={handleSendMoney} disabled={loading}>
                {loading ? "Sending..." : "Send"}
            </button>
        </div>
    );
}

export default SendFund;