import express from 'express';
import  {registerUser, getUser, updateUser, getUserById, emailExists, manageProducts, afterPay} from '../controllers/userControllers.js'
import {registerValidation} from '../../middlewares/bodyValidator.js'

const router = express.Router()

//post  http://localhost:3001/api/v1/user
router.post('/',registerValidation, registerUser)


//get  http://localhost:3001/api/v1/user
router.get('/', getUser)


//get http://localhost:3001/api/v1/user/:id
router.get('/:id', getUserById)
//patch http://localhost:3001/api/v1/user/:id
router.patch('/:id', updateUser)

//get http://localhost:3001/api/v1/user/verify/exists?email=gonzaemma@gmail.com
router.get('/verify/exists', emailExists)


// shopCart 
// http://localhost:3001/api/v1/user/shopCart/1231231231
router.post('/shopCart/:id', manageProducts)
// limpiar carrito luego de comprar
router.delete('/shopCart/:id', afterPay)
export default router;