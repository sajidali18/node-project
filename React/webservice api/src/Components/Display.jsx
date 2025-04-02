import React, { useState } from 'react';
import axios from 'axios';

function Display() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://node-project-1-bpts.onrender.com/data/find', { withCredentials: true });
            setUsers(response.data); 
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div className="container">
            <h3 className="text-center mb-4">User Data</h3>

            <button className="btn btn-primary mb-3" onClick={fetchUsers}>
                Load Users
            </button>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Login ID</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.First_Name}</td>
                            <td>{user.Last_Name}</td>
                            <td>{user.Email}</td>
                            <td>{user.LoginId}</td>
                            <td>{user.address[0]?.Street}, {user.address[0]?.City}, {user.address[0]?.State}, {user.address[0]?.Country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Display;
