import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function LoginPage() {
    const [form, setForm] = useState({ Email: "", Password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "https://node-project-1-bpts.onrender.com/data/login",
                form,
                { withCredentials: true }
            );

            if (response.data.success) {
                navigate("/room", { state: { email: form.Email } });
            } else {
                alert("Invalid credentials, please try again.");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data?.message || error.message);
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" id="Email" placeholder="Enter Your Email" value={form.Email} onChange={handleChange} required />

                <label>Password</label>
                <input type="password" id="Password" placeholder="Enter Your Password" value={form.Password} onChange={handleChange} required />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p>Don't have an account? <Link to="/">Sign Up</Link></p>
        </div>
    );
}

export default LoginPage;
