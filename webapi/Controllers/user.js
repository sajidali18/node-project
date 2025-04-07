const User = require('../models/UserSchema');

const userinfo = async (req, res) => {
    try {
        console.log('hello')
        const socketId = req.query.socketId; 
        console.log(socketId);
        const user = await User.findOne({ socketId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
}

module.exports = userinfo;
