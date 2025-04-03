const user = require('../models/UserSchema');
const bcrypt = require('bcryptjs')

const Userlogin = async (req, res) => {
    try {
        const { email, Password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format. Please provide a valid email.", success: false });
        }

        const validuser = await user.findOne({ email });
        // console.log(validuser);
        if (!validuser)
            return res.status(404).json({
                messsage: "Invalid Credentials",
            });

        const pass_match = await bcrypt.compare(Password, validuser.Password);

        if (!pass_match)
            return res.status(404).json({ message: "Invalid Credentials" });
        res.status(200).json({ message: "login success", success: true });
    }
    catch (err) {
        console.error("error : ", err);
        res.status(500).json({ message: "internal server error", error: err.message });
    }
}
module.exports = Userlogin;