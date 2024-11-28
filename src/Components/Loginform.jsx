import { useState, useEffect } from "react";
import axios from "axios";
import image from "../assets/image.png";
import { Link, useNavigate  } from "react-router-dom";
import "../App.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    useEffect(() => {
        // Check if user credentials are stored in localStorage
        const savedEmail = localStorage.getItem("userEmail");
        const savedPassword = localStorage.getItem("userPassword");

        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Make POST request to login API
            const response = await axios.post(
                "https://huddlehub-75fx.onrender.com/login/",
                {
                    email,
                    password,
                }
            );

            console.log("Login successful:", response.data);

            // Store token in localStorage upon successful login
            const token = response.data;
            localStorage.setItem("authToken", token);

            // Optionally store email or other user info for further use
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password); // If you want to auto-fill the fields later

            console.log("Token stored:", token);

            // Redirect to dashboard or main page if needed (this is optional)
            // window.location.href = '/dashboard'; // or use React Router navigate method

        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            setError(error.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wrapper">
            <div className="left-side">
                <img className="network" src={image} alt="network illustration" />
            </div>
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Welcome back!</h2>
                    <p>Enter your email and password</p>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>

                        <Link to="/ResetPassword" className="forgot-password">
                            Forgot Password?
                        </Link>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Loginform;
