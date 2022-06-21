import Categories from "../models/category.js"
import path, {dirname} from "path"
import { fileURLToPath } from 'url';
import pkg from 'fs-extra';
const { unlink } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

export const categories = async (req, res) => {
    try {
        const user = await Categories.find()
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.json({ error: "Error de servidor" })
    }
}

export const category = async (req, res) => {
    const name = req.query.name
    try {
        // if (!name) return res.json({ error: "query invalid" })
        const categories = await Categories.find({
            name: { $regex: name, $options: "i" }
        })

        let newCategories = categories.map(el=> {el.img = {}; return el})
        
        if (categories.length === 0)
            return res.json({ error: "not found category" })

        return res.json(newCategories)
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

        let cat = await Categories.findById(id)
        if (!cat)
            return res
                .status(404)
                .json({ error: `No Category found with ID: ${id}` })
        let returnData = {_id: cat._id, name: cat.name, description:cat.description}
        return res.json(returnData)
    } catch (error) {
        return res.status(500).json({ error })
    }
}
export const getImgCategorybyID = async(req, res)=> {
    try {
        const id = req.params.id
        if (!id)
            return res
                .status(500)
                .json({ error: `BAD REQUEST - No id provided` })

        let cat = await Categories.findById(id)
        if (!cat)
            return res
                .status(404)
                .json({ error: `No Category found with ID: ${id}` })
        res.set('Content-Type', cat.img.contentType); 
        return res.send(cat.img.data)

    } catch (error) {
        return res.status(500).json({ error })
    }
}

export const postCategory = async (req, res) => {
    try {
        const { name, description } = req.query;
        const image = req.files; 

        let exists = await Categories.find({ name: name })
        if (!exists.length) {
            const myCategory = new Categories({
                name,
                description})
            myCategory.img.data = image.imageCategory.data; 
            myCategory.img.contentType = image.imageCategory.mimetype;

            await myCategory.save()
            res.status(201).json(myCategory)
        } else {
            res.status(409).json({
                msg: "La categoría que intenta crear YA EXISTE en la base de datos"
            })
        }
    } catch (e) {
        console.log("Error en el postCategory. ", e.message)
    }
}

export const upDateCategory = async(req,res) => {
    try {
        const id = req.params.id;
        const {name, description} = req.query; 
        const upDates = {name, description}

        const image =  req.files
        if(image && image.imageCategory) {
            upDates.img = {}; 
            upDates.img.data = image.imageCategory.data;
            upDates.img.contentType = image.imageCategory.mimetype; 
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
            res.send("Categoría eliminada exitosamente.")
        } else {
            res.status(404).send("No se encontró la categoría a eliminar.")
        }
    } catch (e) {
        console.log("Error en deleteCategory. ", e.message)
    }
}
