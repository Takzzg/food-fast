import express from "express"
import { check } from "express-validator"
import { validarCampos } from "../../middlewares/validar-campo.js"
import {
    categories,
    deleteCategory,
    category,
    postCategory,
    findCatById,
    upDateCategory,
    categoryProduct
} from "../controllers/categoriesControllers.js"


const router = express.Router()

//GET: http://localhost:3001/api/v1/categories
router.get("/", categories)



//GET: http://localhost:3001/api/v1/categories/categoryProduct?name=merienda
router.get("/categoryProduct", categoryProduct)




//GET: http://localhost:3001/api/v1/categories/category?name=merienda
router.get("/category", category)

//GET: http://localhost:3001/api/v1/categories/:id
router.get("/:id", findCatById)


//POST http://localhost:3001/api/v1/categories/
router.post(
    "/",
    [check("name", "El name es obligatorio").not().isEmpty(), validarCampos],
    postCategory
)



// update CATEGORY hhtp://localhost:3001/api/v1/categories/:id
router.patch('/:id', upDateCategory)

//DELETE POST http://localhost:3001/api/v1/categories/:id
router.delete(
    "/:id",
    [check("id", "No es un id de MongoDb válido").isMongoId(), validarCampos],
    deleteCategory
)

export default router