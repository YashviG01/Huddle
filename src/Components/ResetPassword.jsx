// import React from "react";
import "./ResetPassword.css";
import image from "../assets/img2.png"; 

const ResetPassword = () => {
  return (
    <div className="reset-password-wrapper">
      <div className="reset-password-left">
        <img src={image} alt="Password Reset Illustration" />
      </div>
      <div className="reset-password-right">
        <h2>Reset Password!</h2>
        <p>Enter your email to receive a password reset link.</p>
        <form className="reset-password-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              
            />
          </div>
          <button type="submit" className="reset-button">
            Send Reset Link
          </button>
        </form>
        <p className="login-link">
          Remember your password? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
