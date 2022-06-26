import express from 'express';
import  {registerUser, getUser, updateUser, deleteUser,
    getUserById, emailExists,  cleanCar, addItemCard, 
    removeCarItem, removeAllSameItems, addPrevItemsAuth} from '../controllers/userControllers.js'
import {registerValidation} from '../../middlewares/bodyValidator.js'

const router = express.Router()

//post  http://localhost:3001/api/v1/user
router.post('/',registerValidation, registerUser)


//get  http://localhost:3001/api/v1/user
router.get('/', getUser)

//delete http://localhost:3001/api/v1/user
router.delete('/:id', deleteUser)

//get http://localhost:3001/api/v1/user/:id
router.get('/:id', getUserById)
//patch http://localhost:3001/api/v1/user/:id
router.patch('/:id', updateUser)

//get http://localhost:3001/api/v1/user/verify/exists?email=gonzaemma@gmail.com
router.get('/verify/exists', emailExists)


// shopCart 
// http://localhost:3001/api/v1/user/shopCart/add/1231231231
router.post('/shopCart/add/:id', addItemCard)

// http://localhost:3001/api/v1/user/shopCart/remove/1231231231
router.post('/shopCart/remove/:id', removeCarItem)

// http://localhost:3001/api/v1/user/shopCart/removeSame/1231231231
router.post('/shopCart/removeSame/:id', removeAllSameItems)

// http://localhost:3001/api/v1/user/shopCart/addPrevItem/1231231231
router.post('/shopCart/addPrevItem/:id', addPrevItemsAuth)

// limpiar carrito luego de comprar
router.delete('/shopCart/:id', cleanCar)

export default router;