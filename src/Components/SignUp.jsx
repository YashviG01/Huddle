import { useState } from "react";
import "/src/SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    const validatePassword = (password) => {
        if (password.length < 6) return "Weak";
        if (!/[A-Z]/.test(password)) return "Medium";
        if (!/[^a-zA-Z0-9]/.test(password)) return "Strong";
        return "Very Strong";
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        if (name === "password") {
            setPasswordStrength(validatePassword(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error
        setSuccess(""); // Reset success message

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Check if terms are accepted
        if (!formData.termsAccepted) {
            setError("You must accept the Terms of Service.");
            return;
        }

        setLoading(true); // Set loading state to true

        try {
            // Sending data to the server with POST request
            const response = await fetch("https://huddlehub-75fx.onrender.com/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Ensure we are sending JSON data
                },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone_number: formData.phone_number, // Use the correct key
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    termsAccepted: formData.termsAccepted,
                }), // Send the form data as JSON
            });

            // Check if the response is OK
            if (!response.ok) {
                throw new Error("Signup failed. Please try again.");
            }

            // Parse the response to get the data
            const datas = await response.json();

            // Log the response to debug the structure
            console.log("Response data:", datas);

            // Ensure the token exists in the response before accessing it
            if (datas && datas.data) {
                const token = datas.data.token;
                localStorage.setItem("authToken", token);

                // Optionally save user email/password to localStorage (if needed)
                localStorage.setItem("userEmail", formData.email);
                localStorage.setItem("userPassword", formData.password);

                console.log("Signup successful!");

                setSuccess("Signup successful! You are now logged in.");

                // Clear the form
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone_number: "",
                    password: "",
                    confirmPassword: "",
                    termsAccepted: false,
                });
            }
        } catch (err) {
            setError(err.message); // Set error if there is one
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    const navigate = useNavigate();

    const redirect = () => {
        navigate("/HomePage");
    }

    return (
        <>
            <div className="logo-div">
                <img src="src/assets/logo.png" alt="logo" width="40px" height="40px" />
                <div>
                    <h1 className="logo">HUDDLE HUB</h1>
                    <p className="logo logo-subtext">- LET US CONNECT -</p>
                </div>
            </div>

            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Create An Account</h2>

                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <div className="form-group">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone_number"
                            placeholder="Phone Number"
                            value={formData.phone_number} // Use the correct key for phone number
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span className={passwordStrength.toLowerCase()}>
                            {passwordStrength}
                        </span>
                    </div>
                    <div className="form-group">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? "Hide Passwords" : "Show Passwords"}
                        </button>
                    </div>
                    <div className="form-group checkbox">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                        />
                        <label>
                            I agree to the <a href="/terms">Terms of Service</a> and{" "}
                            <a href="/privacy">Privacy Policy</a>.
                        </label>
                    </div>

                    {/* Submit button */}
                    <button type="submit" disabled={loading} onClick={redirect}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignUp;
