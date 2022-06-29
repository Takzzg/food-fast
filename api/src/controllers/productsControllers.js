import Product from "../models/product.js"
import fs from "fs-extra"
import {uploadImage,deleteImage} from '../../ultis/cloudinary.js'


export const getProduct = async (req, res) => {
    const { name, filter, sortOrder, filterValue, filterOrder } = req.query

    try {
        if (name) {
            //GET http://localhost:3001/api/v1/products?name=vodka
            const product = await Product.find({
                name: { $regex: name, $options: "i" }
            })
           
           
            return product.length === 0
                ? res.json({ error: "not found product" })
                : res.json(product)
        } else if (filter || sortOrder || filterValue || filterOrder) {
            //GET http://localhost:3001/api/v1/products?filter=category&filterValue=cafeteria&filterOrder=price&sortOrder=-1

            //const objFilter = {};
            //objFilter["price"] = "123"  ->  { price: '123'}
            const objFilter = {}
            objFilter[filter] = filterValue

            const objOrder = {}
            objOrder[filterOrder] = sortOrder

            const product = await Product.find(objFilter).sort(objOrder)
            return res.json(
                product.length === 0 ? "not found product" : product
            )
        } else {
            const allProducts = await Product.find()
            return allProducts.length === 0
                ? res.json({ error: "not found all products" })
                : res.json(allProducts)
        }
    } catch (error) {
        console.log(error)
    }
}
export const getProductbyId = async (req, res) => {
    try {
        const id = req.params.id
        let isHex = /^[0-9A-F]{24}$/gi.test(id) //verificación que es un hex de 24 caracteres
        if (!isHex) {
            return res.status(400).json({ error: "no es un objectId" })
        }
        const product = await Product.findById(id) //populate
        if (!product) return res.status(404).json({ error: "not found product" })
        return res.json(product)
    } catch (e) {
        console.log(e)
        return res.json({ msg: "Error de servidor, en getProductById" })
    }
}

//link facilita la subida de archivos https://hoppscotch.io/es/
export const postProduct= async(req,res)=>{
    const {   name,
            description,
            price,
            available,
            categories, // <-- Aquí
            stock} = req.body
   try {
    const data = {
        name,
        description,
        price,
        available,
        categories: JSON.parse(categories), // <--- Y aqui
        stock
    }
    const product = new Product(data)
    if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath)
        product.image = {
          public_id: result.public_id,
          secure_url: result.secure_url
        }
        await fs.unlink(req.files.image.tempFilePath)
      }
    await product.save()
    return res.json({"product" : product})
    
   } catch (error) {
    console.log(error)
   }
}

export const putProduct = async (req, res) => {
    const { id } = req.params
    const { ...resto } = req.body

    const productoUpdate = await Product.findByIdAndUpdate(id, resto, {
        new: true
    })
    res.status(200).json(productoUpdate)
}

export const deleteProduct = async (req, res) => {
   try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if(!product) return res.json({err: "Not found product"})
    await deleteImage(product.image.public_id)
    res.status(200).json({
        msg: "Product deleted"
    })
   } catch (error) {
    console.log(error)
   }
}

export const upDate = async (req, res) => {
    try {
        const id = req.params.id
        const { name, description, stock, price, categories, prevImg } = req.body
        const prevImage = JSON.parse(prevImg); 

        let upDates = {
            name,
            description,
            stock,
            price,
            categories: JSON.parse(categories),
            image: prevImage
        }
        if (req.files?.image) {
            await deleteImage(prevImage.public_id)
            const result = await uploadImage(req.files.image.tempFilePath)
            upDates.image = {
              public_id: result.public_id,
              secure_url: result.secure_url
            }
            await fs.unlink(req.files.image.tempFilePath)
          }

        const product = await Product.findByIdAndUpdate(id, upDates)
        if (!product) return res.json({ err: "not found product" })
        return res.json({ ok: "upDate Product" })
    } catch (error) {
        console.log(error)
        return res.json({ msg: "Error de servidor" })
    }
}