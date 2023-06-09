import User from "../../models/user";
import connectDb from "../../middleware/mongoose";
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ email: req.body.email })
        let bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
        let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedData) {
                var token = jwt.sign({ email: user.email, password: user.password },  process.env.JWT_SECRET);
                res.status(200).json({ success: true, token })
            }
            else {
                res.status(200).json({ success: false, error: 'Invalid Credentials' })
            }
        }
        else {
            res.status(200).json({ success: false, error: 'No user found' })
        }
    }
    else {

        res.status(400).json({ error: 'This method is not allowed' })
    }
}
export default connectDb(handler);