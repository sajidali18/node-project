import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import axios from "axios";

const socket = io("https://node-project-1-bpts.onrender.com");

const Room = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const email = location.state?.email;
    console.log(email);

    useEffect(() => {
        socket.on("connect", () => {
            if (email) {
                socket.emit("joinLiveUsersRoom", { Email: email });
                socket.emit("getUsersInRoom", "live users");
            }
        });
        socket.on("updateUsers", (userList) => {
            console.log("Updated user list:", userList);
            setUsers(userList);
        });

        return () => {
            socket.off("updateUsers");
        };
    }, [email]);

    // 🔍 Click handler based on index
    const handleUserClick = async (index) => {
        const user = users[index];
        if (user) {
            console.log("Selected user:", user);
            const res = await axios.get(`https://node-project-1-bpts.onrender.com/data/user?socketId=${user.socketId}`,{
             withCredentials: true
            });
            setSelectedUser(res.data);
            setShowModal(true);
        } else {
            alert("User not found");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Live Users in the Room
            </h2>

            <div className="space-y-4">
                {users.length === 0 ? (
                    <div className="text-center text-gray-400 italic">
                        No users in the room yet.
                    </div>
                ) : (
                    users.map((user, index) => (
                        <div
                            key={index}
                            className="p-4 border rounded-lg bg-gray-50 hover:bg-blue-50 transition"
                        >
                            <p>
                                <span className="font-semibold">Email:</span>{" "}
                                <button
                                    onClick={() => handleUserClick(index)}
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    {user.Email}
                                </button>
                            </p>
                            <p>
                                <span className="font-semibold">Socket ID:</span>{" "}
                                <button
                                    onClick={() => handleUserClick(index)}
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    {user.socketId}
                                </button>
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && selectedUser && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            User Details
                        </h3>
                        <div className="space-y-2 text-gray-700">
                            <p><b>First Name:</b> {selectedUser.First_Name}</p>
                            <p><b>Last Name:</b> {selectedUser.Last_Name}</p>
                            <p><b>Email:</b> {selectedUser.Email}</p>
                            <p><b>Mobile_No:</b> {selectedUser.Mobile_No}</p>
                            <p><b>LoginId:</b> {selectedUser.LoginId}</p>
                            <p><b>Street:</b> {selectedUser.address[0].Street}</p>
                            <p><b>City:</b> {selectedUser.address[0].City}</p>
                            <p><b>State:</b> {selectedUser.address[0].State}</p>
                            <p><b>Country:</b> {selectedUser.address[0].Country}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Room;
