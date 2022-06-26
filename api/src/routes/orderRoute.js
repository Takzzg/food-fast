import express from 'express';
import { check } from 'express-validator';
import { 
    deleteCompletedOrders,
    deleteOrderById,
    deleteUserOrders,
    getAllOrders, 
    getOrderByID, 
    getUserOrders, 
    postOrder,
    updateOrderStatus} from '../controllers/orderControllers.js'
import { validarCampos } from '../../middlewares/validar-campo.js';

const router = express.Router()

// Orders para el admin: 
//GET http://localhost:3001/api/v1/orders
router.get("/",getAllOrders);

//DELETE http://localhost:3001/api/v1/orders
router.delete('/', deleteCompletedOrders)

//DELETE http://localhost:3001/api/v1/orders/"ObjetId de orden"
router.delete('/:id', deleteOrderById)

//PUT http://localhost:3001/api/v1/orders?id=${orderId}&status=${orderStatus}
router.patch('/', updateOrderStatus)

// Orders para un usuario: 
//GET http://localhost:3001/api/v1/orders/user/1231231
router.get("/user/:userID",getUserOrders);

//DELETE http://localhost:3001/api/v1/orders/orderDelete/1231231
router.get('/orderDelete/:orderID', deleteUserOrders)

// GET  http://localhost:3001/api/v1/orders/123123
router.get('/:orderID', getOrderByID)
export default router;
