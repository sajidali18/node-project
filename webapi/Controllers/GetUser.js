const express = require('express');
const User = require('../models/UserSchema');

const GetUser = async (req,res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users);  
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message }); 
    }
}

module.exports = GetUser;
