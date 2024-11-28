import { useState} from "react";
import { useNavigate } from "react-router-dom";
import "/src/SignUp.css";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    const navigate = useNavigate();

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
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!formData.termsAccepted) {
            setError("You must accept the Terms of Service.");
            return;
        }

        setLoading(true);












        try {
            const response = await fetch('https://huddlehub-75fx.onrender.com/signup/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Signup failed. Please try again.");
            }

            // Retrieve existing users from localStorage
            const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

            // Add new user to the existing list
            const newUser = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password, // Ideally, password should be hashed before storing
            };

            // Add new user to users list
            existingUsers.push(newUser);
            console.log(response);


            // Save updated users list back to localStorage
            localStorage.setItem("users", JSON.stringify(existingUsers));

            setSuccess("Signup successful! Welcome to HuddleHub.");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                termsAccepted: false,
            });
        } 
        
        
        
        
        
        
        







        
        
        catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

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
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
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
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
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
                        <button type="button" className="toggle-password-btn" onClick={togglePasswordVisibility}>
                            {passwordVisible ? 'Hide Passwords' : 'Show Passwords'}
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
                    <button type="submit" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignUp;