import React, { useEffect, useState } from "react";
import Navbar_v2 from "./Navbar_v2";
import "./LoadFunds.css";

function LoadFunds() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="body">
            <Navbar_v2 />
            <div className="frame-350">
                <h2>Load Funds</h2>
                <div></div>
            </div>
            <div className="receiving-details">
                <p>Receiving Details</p>
                <div className="receiving-container">
                    <div className="group-414">
                        <p>Account Number</p>
                        <p>{user?.id || "Loading..."}</p> {/* ✅ Dynamically set user ID */}
                    </div>
                    <div className="group-413">
                        <p>IBAN</p>
                        <p>{`INT001CASHAPP${user?.id || "XXXXX"}`}</p> {/* ✅ IBAN updated */}
                    </div>
                    <div className="rectangle-69">
                        <div id="QR-Code"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadFunds;
