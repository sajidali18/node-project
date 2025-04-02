const User = require('../models/UserSchema');
const validator = require('validator');
const bcrypt = require('bcrypt');

const hashing = async (Password) => {
    const num = 10;
    return await bcrypt.hash(Password, num);
}

const validId = (LoginId) => {
    const regexId = /^[a-zA-Z0-9]{8}$/;
    return regexId.test(LoginId);
}
const validPass = (Password) => {
    const regexId = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6}$/;
    return regexId.test(Password);
}


const UserDetail = async (req, res) => {
    try {
        const { First_Name, Last_Name, Mobile_No, Email, LoginId, Password, Street,City,State, Country } = req.body;
        const existuser = await User.findOne({ Email });
        if (!validator.isEmail(Email)) {
            return res.status(400).json({ message: "invalid email plz provide a valid mail" });
        }
        if (existuser) {
            return res.status(400).json({ message: "user already exist" });
        }
        if (!validId (LoginId)) {
            return res.status(400).json({
                message: "invalid loginID format: create a strong loginId",
                success: false
             });
        }
        if (!validPass (Password)) {
            return res.status(400).json({
                message: "invalid Password format: create a strong Password",
                success: false
             });
        }
        
        const realPass = await hashing(Password);
      
        const newUser = new User({
            First_Name,
            Last_Name,
            Mobile_No,
            Email,
            LoginId,
            Password: realPass,
            address: [{
                Street,
                City,
                State,
                Country,
            }]
           })
        
        await newUser.save();
        // console.log(newUser);
        req.skt.emit('newUser', newUser);
        req.skt.to('live users').emit('userJoined', newUser);
        
        return res.status(201).json({ message: "data stored successfully ", success: true });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}
module.exports = UserDetail;