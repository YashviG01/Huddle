import { useState } from "react";
import axios from "axios";
import image from "../assets/image.png";
import { Link } from "react-router-dom";
import "../App.css";
// import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
//   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
     
      const response = await axios.post(
"https://huddlehub-75fx.onrender.com/login/",
       
        {
          email,
          password,
        },
        
       
      );

      console.log("Login successful:", response.data);
      localStorage.setItem("authToken", response.data.token);
      console.log("token:",response.data.token)
  
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
          {/* <p className="separator">or login with</p> */}
          <div className="social-login">
            {/* <button className="google">Google</button>
            <button className="facebook">Facebook</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
