import express from 'express';
import  {registerUser, getUser, updateUser, getUserById, emailExists} from '../controllers/userControllers.js'
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

export default router;