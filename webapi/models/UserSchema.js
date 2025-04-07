const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    First_Name: {
        type: String,
        required: true,
    },
    Last_Name: {
        type: String,
        required: true,
    },
    Mobile_No: {
        type: Number,
        unique: true,
        required : true,
    },
    Email: {
        type: String,
        required: true,
    },
    address: [{
        Street: {
            type: String,
            required:true,
        },
        City: {
            type: String,
            required:true,
        },
        State: {
            type: String,
            required:true,
        },
        Country: {
            type: String,
            required:true,
        },
    }],
    LoginId: {
        type: String,
        required: true,
        
    },
    Password: {
        type: String,
        required: true,
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now 
    },
    socketId: {
    type: String
    }
})
const User = mongoose.model("detail", userschema);
module.exports = User;