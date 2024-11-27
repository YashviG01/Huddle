import  { useState } from "react";
import "./App.css";
import illustration from "./reset.png"; // Replace with the correct path to your image

function App() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess(true);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src={illustration} alt="Reset Illustration" className="illustration" />
      </div>
      <div className="right-section">
        <h1 className="title">Set New Password!</h1>
        <p className="subtitle">Secure your account with a new password.</p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button">
            Reset Password
          </button>
        </form>
        {success && <p className="success">Password reset successfully!</p>}
        <p className="back-to-login">
          Back to login? <a href="/login" className="login-link">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default App;
