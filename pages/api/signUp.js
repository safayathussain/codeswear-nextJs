import User from "../../models/user";
import connectDb from "../../middleware/mongoose";
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const {name, email} = req.body;
        let p = new User ({
            userName: req.body.name,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password,  process.env.AES_SECRET).toString()
        })
        await p.save()
        res.status(200).json({ success: "success" })
    }
    else {

        res.status(400).json({ error: 'This method is not allowed' })
    }
}
export default connectDb(handler);