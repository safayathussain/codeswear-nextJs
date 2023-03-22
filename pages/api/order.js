import connectDb from "../../middleware/mongoose";
import Order from "@/models/Order";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let order = new Order({
            email:req.body.email,
            orderId:req.body.oid,
            address:req.body.address,
            amount:req.body.subTotal,
            status:req.body.status,
            paymentInfo:req.body.paymentInfo,
            products: [
                req.body.cart
            ]
        })
        await order.save()
        res.status(200).json({ success: "success" })
    }
    else {

        res.status(400).json({ error: 'This method is not allowed' })
    }
}
export default connectDb(handler);