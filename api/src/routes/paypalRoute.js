import express from 'express';
import {createOrden, captureOrder,cancelOrder} from '../controllers/paypalControllers.js'
const router = express.Router()

//http://localhost:3001/api/v1/paypal/createOrden
router.post('/createOrden', createOrden)

router.get('/captureOrder', captureOrder)

router.get('/cancelOrder', cancelOrder)

export default router;