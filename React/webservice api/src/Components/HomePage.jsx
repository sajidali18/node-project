import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './HomePage.css'

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
    })

    const handlechange = (e) => {
        setForm({
            ...Form,
            [e.target.id]: e.target.value
        })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(Form)
            const response = await axios.post('http://localhost:2000/data/save', Form, {
                withCredentials: true
            });
            if (response.data.success) {
                alert('data saved in database')
                // navigate('/otp');
            }
            else {
                alert('server error plz try again');
                // navigate('/login')
            }
        }
        catch (error) {
            console.log("error", error.response);
        }
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
        })
    }
        return (
            <div className="container">
                <div className="card shadow p-4">
                    <h3 className="text-center mb-4">User Registration</h3>
                    <form id="userForm" onSubmit={handlesubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="First_Name" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="First_Name" name="First_Name" value={Form.First_Name} onChange={handlechange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="Last_Name" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="Last_Name" name="Last_Name"  required value={Form.Last_Name} onChange={handlechange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="Mobile_No" className="form-label">Mobile No</label>
                                <input type="text" className="form-control" id="Mobile_No" name="Mobile_No" value={Form.Mobile_No} onChange={handlechange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="Email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="Email" name="Email" value={Form.email} onChange={handlechange} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="LoginId" className="form-label">Login ID (8 Characters)</label>
                                <input type="text" className="form-control" id="LoginId" name="LoginId" required value={Form.LoginId} onChange={handlechange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="Password" className="form-label">Password (6 Characters)</label>
                                <input type="password" className="form-control" id="Password" name="Password" required value={Form.Password} onChange={handlechange} />
                            </div>
                        </div>
                        <h5 className="mt-3">Address</h5>
                        <div className="mb-3">
                            <label htmlFor="Street" className="form-label">Street</label>
                            <input type="text" className="form-control" id="Street" name="Street" value={Form.Street} onChange={handlechange} required />
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="City" className="form-label">City</label>
                                <input type="text" className="form-control" id="City" name="City" value={Form.City} onChange={handlechange} required />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="State" className="form-label">State</label>
                                <input type="text" className="form-control" id="State" name="State" value={Form.State} onChange={handlechange} required />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="Country" className="form-label">Country</label>
                                <input type="text" className="form-control" id="Country" name="Country" value={Form.Country} onChange={handlechange} required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                    <button className="btn btn-info mt-3" onClick={() => navigate("/all")}>
                        View Users
                    </button>
                </div>
            </div>

        )
    }

export default HomePage