import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user authentication
        localStorage.removeItem("authenticated");
        navigate("/login"); // Redirect to login page after logout
    }, [navigate]);

    return null; // You can return a loading spinner or a message if needed
}