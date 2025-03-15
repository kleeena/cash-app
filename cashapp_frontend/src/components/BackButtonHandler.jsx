import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButtonHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleBackButton = () => {
            if (location.pathname !== "/dashboard") {
                navigate("/dashboard", { replace: true });
            }
        };

        window.onpopstate = handleBackButton;

        return () => {
            window.onpopstate = null; // Cleanup event listener
        };
    }, [location, navigate]);

    return null; // This component doesn't render anything
};

export default BackButtonHandler;
