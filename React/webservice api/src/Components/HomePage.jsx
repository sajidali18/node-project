import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();
    const [Form, setForm] = useState({
        First_Name: '',
        Last_Name: '',
        Mobile_No: '',
        Email: '',
        LoginId: '',
        Password: '',
        Street: '',
        City: '',
        State: '',
        Country: ''
    });

    const [errors, setErrors] = useState({});  // State to store validation errors

    const handlechange = (e) => {
        setForm({
            ...Form,
            [e.target.id]: e.target.value
        });
        setErrors({ ...errors, [e.target.id]: '' });  // Clear error on change
    };

    const validateForm = () => {
        let newErrors = {};

        if (!Form.First_Name.trim()) newErrors.First_Name = "First Name is required";
        if (!Form.Last_Name.trim()) newErrors.Last_Name = "Last Name is required";
        if (!Form.Mobile_No.trim() || !/^\d{10}$/.test(Form.Mobile_No))
            newErrors.Mobile_No = "Enter a valid 10-digit Mobile No";
        if (!Form.Email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Form.Email))
            newErrors.Email = "Enter a valid email";
        if (!Form.LoginId.trim() || Form.LoginId.length !== 8)
            newErrors.LoginId = "Login ID must be 8 characters";
        if (!Form.Password.trim() || Form.Password.length < 6)
            newErrors.Password = "Password must be at least 6 characters";
        if (!Form.Street.trim()) newErrors.Street = "Street is required";
        if (!Form.City.trim()) newErrors.City = "City is required";
        if (!Form.State.trim()) newErrors.State = "State is required";
        if (!Form.Country.trim()) newErrors.Country = "Country is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;  // Return true if no errors
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Stop submission if validation fails

        try {
            const response = await axios.post('https://node-project-1-bpts.onrender.com/data/save', Form, {
                withCredentials: true
            });

            if (response.data.success) {
                toast.success('Data saved successfully!', { position: "top-center" });
                setForm({
                    First_Name: '',
                    Last_Name: '',
                    Mobile_No: '',
                    Email: '',
                    LoginId: '',
                    Password: '',
                    Street: '',
                    City: '',
                    State: '',
                    Country: ''
                });
            } else {
                toast.error('Server error, please try again!', { position: "top-center" });
            }
        } catch (error) {
            toast.error('Error: ' + (error.response?.data?.message || 'Something went wrong!'), { position: "top-center" });
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
                            <label htmlFor="First_Name" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="First_Name" value={Form.First_Name} onChange={handlechange} />
                            <small className="text-danger">{errors.First_Name}</small>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="Last_Name" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="Last_Name" value={Form.Last_Name} onChange={handlechange} />
                            <small className="text-danger">{errors.Last_Name}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="Mobile_No" className="form-label">Mobile No</label>
                            <input type="text" className="form-control" id="Mobile_No" value={Form.Mobile_No} onChange={handlechange} />
                            <small className="text-danger">{errors.Mobile_No}</small>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="Email" value={Form.Email} onChange={handlechange} />
                            <small className="text-danger">{errors.Email}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="LoginId" className="form-label">Login ID (8 Characters)</label>
                            <input type="text" className="form-control" id="LoginId" value={Form.LoginId} onChange={handlechange} />
                            <small className="text-danger">{errors.LoginId}</small>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="Password" className="form-label">Password (6 Characters)</label>
                            <input type="password" className="form-control" id="Password" value={Form.Password} onChange={handlechange} />
                            <small className="text-danger">{errors.Password}</small>
                        </div>
                    </div>
                    <h5 className="mt-3">Address</h5>
                    <div className="mb-3">
                        <label htmlFor="Street" className="form-label">Street</label>
                        <input type="text" className="form-control" id="Street" value={Form.Street} onChange={handlechange} />
                        <small className="text-danger">{errors.Street}</small>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="City" className="form-label">City</label>
                            <input type="text" className="form-control" id="City" value={Form.City} onChange={handlechange} />
                            <small className="text-danger">{errors.City}</small>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="State" className="form-label">State</label>
                            <input type="text" className="form-control" id="State" value={Form.State} onChange={handlechange} />
                            <small className="text-danger">{errors.State}</small>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="Country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="Country" value={Form.Country} onChange={handlechange} />
                            <small className="text-danger">{errors.Country}</small>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
                <button className="btn btn-info mt-3" onClick={() => navigate("/all")}>
                    View Users
                </button>
            </div>
        </div>
    );
}

export default HomePage;
