// import React from "react";
import  { useState } from "react";
import axios from "axios";
import "../ResetPassword.css";
import image from "../assets/img2.png"; 

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
      setError("");
  
    //   try {

    //     const token = localStorage.getItem("authToken");

    //     if (!token) {
    //       setError("Authentication token not found. Please log in again.");
    //       setLoading(false);
    //       return;
    //     }
    try {
        const token = localStorage.getItem("authToken");
  console.log(token);
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }
  
        const response = await axios.post(
        `https://huddlehub-75fx.onrender.com/reset/${token}`,
          { email },
          {
            headers: {
              "Content-Type": "application/json",
            //   "X-API-Key": ,
            // Authorization: `Bearer ${token}`,
            },
          }
       
        );
  
        if (response.status === 200) {
            setMessage(response.data.message || "Password reset link sent.");
          } else {
            setError("Unexpected error occurred. Please try again.");
          }      }
           catch (err) {
        console.error("Error details:", err.response || err.message);
        setError(err.response?.data?.message || "Failed to send reset link.");
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <div className="reset-password-wrapper">
      <div className="reset-password-left">
        <img src={image} alt="Password Reset Illustration" />
      </div>
      <div className="reset-password-right">
        <h2>Reset Password!</h2>
        <p>Enter your email to receive a password reset link.</p>
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <p className="login-link">
          Remember your password? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
