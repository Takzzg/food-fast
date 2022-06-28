import Categories from "../models/category.js"
import Product from "../models/product.js"
import fs from "fs-extra"
import {uploadImage,deleteImage} from '../../ultis/cloudinary.js'
//posibles categorias
//almuerzo 
//merienda
//sandwichs
//hamburguesas
//pizzas
//emmpanadas
//bebidas
//veggie

export const categories = async (req, res) => {
    try {
        const categories = await Categories.find()
        return res.json(categories)
    } catch (error) {
        console.log(error)
        return res.json({ error: "Error de servidor" })
    }
}
//busqueda por category
export const categoryProduct = async (req, res) => {
    
    try {
        const productsCtegory = await Product.find({category: req.query.name})
        if(productsCtegory.length === 0) return res.json({err : "Not found products category"})
        return res.json(productsCtegory)
    } catch (error) {
        console.log(error)
    }
}

export const category = async (req, res) => {
    const name = req.query.name
    try {
        // if (!name) return res.json({ error: "query invalid" })
        const categories = await Categories.find({
            name: { $regex: name, $options: "i" }
        })

        if (categories.length === 0)
            return res.json({ error: "not found category" })
        return res.json(categories)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Error de servidor" })
    }
}

export const findCatById = async (req, res) => {
    try {
        const id = req.params.id
        if (!id)
            return res
                .status(500)
                .json({ error: `BAD REQUEST - No id provided` })

        let catgory = await Categories.findById(id)
        if (!catgory)
            return res
                .status(404)
                .json({ error: `No Category found with ID: ${id}` })
       
        return res.json(catgory)
    } catch (error) {
        return res.status(500).json({ error })
    }
}


export const postCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        let exists = await Categories.find({ name: name })
        if (exists.length)
            return res.status(409).json({
                msg: "La categoría que intenta crear YA EXISTE en la base de datos"
            })


        const myCategory = new Categories({
            name,
            description
        })
    if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath)
        myCategory.image = {
          public_id: result.public_id,
          secure_url: result.secure_url
        }
        await fs.unlink(req.files.image.tempFilePath)
      }
    await myCategory.save()
    res.status(201).json(myCategory)
    } catch (e) {
        console.log("Error en el postCategory. ", e.message)
    }
}

export const upDateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const { name, description, prevImg } = req.body
        const upDates = { name, description }
        const prevImage = JSON.parse(prevImg)
        if (req.files?.image) {
            await deleteImage(prevImage.public_id)
            const result = await uploadImage(req.files.image.tempFilePath)
            upDates.image = {
              public_id: result.public_id,
              secure_url: result.secure_url
            }
            await fs.unlink(req.files.image.tempFilePath)
          }
        const category = await Categories.findByIdAndUpdate(id, upDates)
        if (!category) return res.json({ err: "not found product" })
        return res.json({ ok: "upDate Category" })
    } catch (error) {
        console.log(error)
        return res.json({ msg: "Error de servidor" })
    }
}

//Elimina dado un id de categoría.
export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id

        let isDeleted = await Categories.findByIdAndDelete(id)
        if (isDeleted !== null) {
            await deleteImage(isDeleted.image.public_id)
            res.send("Categoría eliminada exitosamente.")
        } else {
            res.status(404).send("No se encontró la categoría a eliminar.")
        }

    } catch (e) {
        console.log("Error en deleteCategory. ", e.message)
    }
}