import React, {useState} from "react";
import axios from "axios"; // Import Axios for API requests
import { useNavigate } from "react-router-dom"; // Import for redirection
import Navbar from "./Navbar.jsx";
import './Register.css'



function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Initialize navigation
   

    // 🔹 Handle Registration Form Submission
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://cash-app-backend-eight.vercel.app/users/register/', {
                username,
                password,
                full_name: username,      
                profile_image: null
            });

            if (response.status === 201) {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2s
            }
        } catch (error) {
            setError("Registration failed. Please check your details.");
            if (error.response) {
                // Server responded with a status code outside 2xx
                console.error("Response Data:", error.response.data);
                console.error("Status Code:", error.response.status);
                console.error("Headers:", error.response.headers);
                setError(error.response.data?.message || "Registration failed. Please check your details.");
            } else if (error.request) {
                // Request was made but no response received
                console.error("No response received:", error.request);
                setError("No response from server. Please try again later.");
            } else {
                // Something else caused an error
                console.error("Request Error:", error.message);
                setError("An unexpected error occurred.");
            }
        }
    };

    return(
        <>
            <Navbar/>
            <img src="/assets/Landing_login/Rectangle.svg" id="rectangle"></img>
            <img src="/assets/Landing_login/Rectangle-2.svg" id="rectangle-2"></img>
            <img src="/assets/Landing_login/Rectangle-3.svg" id="rectangle-3"></img>
            <div className="register">
                <h2 className="register-heading">Register</h2>
                
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        id="email" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <button className="login-register-btn" type="submit">Register</button> 
                </form>
                         
            </div>
           

        </>
    );
}

export default Register;