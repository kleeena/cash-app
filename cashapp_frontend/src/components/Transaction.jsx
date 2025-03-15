import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Transaction.css";

function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("access_token");
                const response = await axios.get("http://127.0.0.1:8000/transactions/history/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const sortedTransactions = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setTransactions(sortedTransactions);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const formatTimestamp = (isoString) => {
        const date = new Date(isoString);
        return {
            formattedTime: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
            formattedDate: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        };
    };

    const getTransactionIcon = (type) => {
        return type === "credit"
            ? "/assets/Dashboard/credit.svg"
            : "/assets/Dashboard/debit.svg";
    };

    return (
        <div className="transaction-list">
            {loading && <p>Loading transactions...</p>}
            {!loading && transactions.length === 0 && <p>No transactions found.</p>}
            
            {transactions.map((transaction, index) => {
                const { formattedTime, formattedDate } = formatTimestamp(transaction.timestamp);
                return (
                    <div key={index} className="transaction-container">
                        <div className="rectangle-1">
                            <img src={getTransactionIcon(transaction.transaction_type)} alt="Transaction Icon" />
                        </div>
                        <div className="trans-details-container">
                            <p className="trans-type">{transaction.transaction_type ? transaction.transaction_type.replace(/\b\w/g, c => c.toUpperCase()) : ""}</p>
                            <p className="trans-merchant">{transaction.recipient_name ? transaction.recipient_name.replace(/\b\w/g, c => c.toUpperCase()) : ""}</p>

                            <p className="trans-time">{formattedTime}</p>
                            <p className="trans-date">{formattedDate}</p>
                        </div>
                        <div className="trans-details-2">
                            <p className="trans-amount">${transaction.amount}</p>
                            <p className="trans-details">Details</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Transaction;
