import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./HomePage.css";
import { io } from 'socket.io-client';

const socket = io("https://node-project-1-bpts.onrender.com")
function HomePage() {

    const navigate = useNavigate();
    const [Form, setForm] = useState({
        First_Name: "",
        Last_Name: "",
        Mobile_No: "",
        Email: "",
        LoginId: "",
        Password: "",
        Street: "",
        City: "",
        State: "",
        Country: "",
    });

    const [errors, setErrors] = useState({});

    const handlechange = (e) => {
        setForm({
            ...Form,
            [e.target.id]: e.target.value.trim(),
        });
        setErrors({ ...errors, [e.target.id]: "" });
    };
    const validateForm = () => {
        let newErrors = {};

        if (!Form.First_Name || !/^[a-zA-Z\s]+$/.test(Form.First_Name))
            newErrors.First_Name = "Provide a proper Name";
        if (!Form.Last_Name || !/^[a-zA-Z\s]+$/.test(Form.Last_Name))
            newErrors.Last_Name = "Provide a proper Name";
        if (!Form.Mobile_No || !/^\d{10}$/.test(Form.Mobile_No))
            newErrors.Mobile_No = "Enter a valid 10-digit Mobile No";
        if (!Form.Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Form.Email))
            newErrors.Email = "Enter a valid email";
        if (!Form.LoginId || Form.LoginId.length !== 8)
            newErrors.LoginId = "Login ID must be 8 characters";
        if (!Form.Password || Form.Password.length < 6)
            newErrors.Password = "Password must be at least 6 characters";

        if (!Form.Street || !/^[a-zA-Z0-9\s]+$/.test(Form.Street))
            newErrors.Street = "Street must be alphanumeric";
        if (!Form.City || !/^[a-zA-Z\s]+$/.test(Form.City))
            newErrors.City = "City must contain only letters";
        if (!Form.State || !/^[a-zA-Z\s]+$/.test(Form.State))
            newErrors.State = "State must contain only letters";
        if (!Form.Country || !/^[a-zA-Z\s]+$/.test(Form.Country))
            newErrors.Country = "Country must contain only letters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post(
                "https://node-project-1-bpts.onrender.com/data/save",
                Form,
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success("Data saved successfully!", { position: "top-center" });
                
                // socket.emit("joinRoom", { room: "live users", user: Form });

                // console.log(`User ${Form.Email} joined the 'live users' room`);
                // console.log(`Socket ID: ${socket.id}`);
                // console.log("User Details:", Form);
                socket.emit("joinLiveUsersRoom", { Email: Form.Email });
                setForm({
                    First_Name: "",
                    Last_Name: "",
                    Mobile_No: "",
                    Email: "",
                    LoginId: "",
                    Password: "",
                    Street: "",
                    City: "",
                    State: "",
                    Country: "",
                });
                    navigate("/room", { state: { email: Form.Email } });

            } else {
                toast.error("Server error, please try again!", { position: "top-center" });
            }
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.message || "Something went wrong!"), {
                position: "top-center",
            });
        }
    };
    return (
        <div className="container">
            <ToastContainer />
            <div className="card shadow p-4">
                <h3 className="text-center mb-4">User Registration</h3>
                <form id="userForm" onSubmit={handlesubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" id="First_Name" value={Form.First_Name} onChange={handlechange} />
                            <small className="text-danger">{errors.First_Name}</small>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="Last_Name" value={Form.Last_Name} onChange={handlechange} />
                            <small className="text-danger">{errors.Last_Name}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Mobile No</label>
                            <input type="text" className="form-control" id="Mobile_No" value={Form.Mobile_No} onChange={handlechange} />
                            <small className="text-danger">{errors.Mobile_No}</small>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" id="Email" value={Form.Email} onChange={handlechange} />
                            <small className="text-danger">{errors.Email}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Login ID (8 Characters)</label>
                            <input type="text" className="form-control" id="LoginId" value={Form.LoginId} onChange={handlechange} />
                            <small className="text-danger">{errors.LoginId}</small>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Password (6 Characters)</label>
                            <input type="password" className="form-control" id="Password" value={Form.Password} onChange={handlechange} />
                            <small className="text-danger">{errors.Password}</small>
                        </div>
                    </div>
                    <h5 className="mt-3">Address</h5>
                    <div className="mb-3">
                        <label className="form-label">Street</label>
                        <input type="text" className="form-control" id="Street" value={Form.Street} onChange={handlechange} />
                        <small className="text-danger">{errors.Street}</small>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">City</label>
                            <input type="text" className="form-control" id="City" value={Form.City} onChange={handlechange} />
                            <small className="text-danger">{errors.City}</small>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">State</label>
                            <input type="text" className="form-control" id="State" value={Form.State} onChange={handlechange} />
                            <small className="text-danger">{errors.State}</small>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Country</label>
                            <input type="text" className="form-control" id="Country" value={Form.Country} onChange={handlechange} />
                            <small className="text-danger">{errors.Country}</small>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" ><Link to='/' id='green'>Save</Link></button>
                </form>
                <button className="btn btn-info mt-3" onClick={() => navigate("/all")}>
                    View Users
                </button>
                <button type="submit"><Link to= '/login'>Login</Link></button>
            </div>
        </div>
    );
}

export default HomePage;
