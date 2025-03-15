import React from "react";
import "./fiat-dashboard.css";
import Navbar_V2 from "./Navbar_v2";

function Fiat() {
        return(
            <body>
                <Navbar_V2/>
                <div className="frame-349">
                    <h2>Fiat Overview</h2>
                    <div></div>
                </div>
                <div className="container-1">
                    <div className="card-1">
                            <p className="balance-type">Fiat Balance</p>
                            <p className="balance-amount">$2,730</p>
                            <img src="assets\Dashboard\Group 1.svg"></img>
                            <img></img>
                    </div>
                    <div className="account-container">
                        <div className="account-id">
                            <p>Account ID</p>
                            <p>#213623</p>
                        </div>
                        <div className="account-period">
                            <p>Period</p>
                            <p>Sept 2022 - Jan 2023</p>
                        </div>
                        <div className="account-starting-balance">
                            <p>Starting Balance</p>
                            <p>$5,234</p>
                        </div>
                        <div className="account-ending-balance">
                            <p>Ending Balance</p>
                            <p>$2,730</p>
                        </div>
                        <div className="account-total-added">
                            <p>Total Added</p>
                            <p>$10,978</p>
                        </div>
                        <div className="account-total-subtracted">
                            <p>Total Subtracted</p>
                            <p>$8,248</p>
                        </div>
                    </div>
                    </div>
                    <div className="line-2"></div>
                    <div className="container-2">
                        <p>My Fiat Assets</p>
                        <p>Amount</p>
                </div>
                
            </body>
        );
}

export default Fiat;