const user = require('../models/UserSchema');
const bcrypt = require('bcryptjs')
const validator = require('validator')

const Userlogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!validator.isEmail(Email)) {
            return res.status(400).json({ message: "Invalid email format. Please provide a valid email.", success: false });
        }
        const validuser = await user.findOne({ Email });
        if (!validuser)
            return res.status(404).json({
                messsage: "hello deel",
            });

        const pass_match = await bcrypt.compare(Password, validuser.Password);

        if (!pass_match)
            return res.status(404).json({ message: "pass does not match" });
        res.status(200).json({ message: "login success", success: true });
    }
    catch (err) {
        console.error("error : ", err);
        res.status(500).json({ message: "internal server error", error: err.message });
    }
}
module.exports = Userlogin;