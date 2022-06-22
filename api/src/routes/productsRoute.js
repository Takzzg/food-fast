import express from 'express';

import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campo.js';
import verifyToken from '../../middlewares/validateToken.js'

import { deleteProduct,
        putProduct, 
        upDate,  
        postProduct, 
        getProduct,
        getImgProductbyId, 
        getProductbyId} from '../controllers/productsControllers.js';


const router = express.Router()


//get product = http://localhost:3001/api/v1/products
router.get('/', getProduct)


//GET http://localhost:3001/api/v1/products/12345
router.get('/:id', getProductbyId);

//GET IMAGE http://localhost:3001/api/v1/products/img/4748231
router.get('/img/:id', getImgProductbyId)

//post product =  http://localhost:3001/api/v1/products
router.post("/",[
    check("name","El name es obligatorio").not().isEmpty(), 
    validarCampos
],postProduct)


//patch product =  http://localhost:3001/api/v1/products/:id
router.patch('/:id', upDate)  


//put product = http://localhost:3001/api/v1/products/754325
router.put("/:id",[
    check("id","No es un id válido").isMongoId(),
    validarCampos
],putProduct)

//delete product = http://localhost:3000/api/v1/products/4312445
router.delete("/:id",[
    check("id","No es un id válido").isMongoId(),
    // check("product").custom(existeProducto),
    validarCampos
],deleteProduct)



export default router;