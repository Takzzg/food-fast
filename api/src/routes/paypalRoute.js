import express from 'express';
import {createOrden, captureOrder,cancelOrder} from '../controllers/paypalControllers.js'
import Product from '../models/product.js';
import Payement from '../models/payement.js';
import Order from '../models/order.js';
const router = express.Router()

//http://localhost:3001/api/v1/paypal/createOrden
router.post('/createOrden', createOrden)

//http://localhost:3001/api/v1/paypal/captureOrder
router.get('/captureOrder', captureOrder)

router.get('/cancelOrder', cancelOrder)

// http://localhost:3001/api/v1/paypal/detailOrder

router.get('/pagos', async(req,res)=>{
    try {
        const pagos = await Payement.find()
        return res.send(pagos)
    } catch (error) {
        console.log(error)
    }
})

// http://localhost:3001/api/v1/paypal/stock 
router.post('/stock', async (req,res)=> {
            // Me tiene que llegar:
            // {id: , price: , cantidad:, total: , newStock: }       

            // reducir stock del producto
            const { userID, total, resumeOrder } = req.body; 
            let promises = resumeOrder.map(el => Product.findByIdAndUpdate(el.id, {stock: el.newStock}));
           Promise.all(promises).then(result=> console.log("xd"))
           // crear orden 
           let data = {user: userID, products: resumeOrder, total: Number(total)}
           const order = new Order(data); 
           await order.save(); 
           res.send(order)
})
export default router;