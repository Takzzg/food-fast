import express from 'express';
import  {login, 
        prueba, 
        forgotPass, 
        resetPostPass,
        resetGetPass} from '../controllers/authControllers.js'
        
import {loginValidation,passwordValidation} from '../../middlewares/bodyValidator.js'

import verifyToken  from '../../middlewares/validateToken.js'

const router = express.Router()

//http://localhost:3001/api/v1/auth/login
router.post('/login',loginValidation,login)

//post  http://localhost:3001/api/v1/auth/forgot-password
router.post("/forgot-password",forgotPass)

//post  http://localhost:3001/api/v1/auth/reset-password/:id/:token
router.post("/reset-password/:id/:token",passwordValidation,resetPostPass)

//get  http://localhost:3001/api/v1/auth/reset-password/:id/:token
router.get("/reset-password/:id/:token",resetGetPass)

//ruta de prueba
router.get('/',verifyToken,prueba)


export default router;
