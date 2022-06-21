import Product from "../models/product.js"
import path, {dirname} from "path"
import { fileURLToPath } from 'url';
import pkg from 'fs-extra';
const { unlink } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

export const allProducts = async (req, res) => {
   
    const products = await Product.find()
    if (!products) {
        return res.status(400).json({
            msg: "not found products"
        })
    }
    const newProducts = products.map(el=> {el.img = {}; return el})
    res.status(201).send(newProducts)
}
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
            const newProducts = product.map(el=> {el.img = {}; return el})
            return res.json(
                product.length === 0 ? "not found product" : newProducts
            )
        } else {
            const allProducts = await Product.find()
            const newProducts = allProducts.map(el=> {el.img = {}; return el})
            return allProducts.length === 0
                ? res.json({ error: "not found all products" })
                : res.json(newProducts)
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
        const prod = await Product.findById(id) //populate
        if (!prod) return res.status(404).json({ error: "not found product" })

        let returnData = {
         _id: prod._id,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        available: prod.available,
        rating: prod.rating,
        categories: prod.categories,
        review: prod.review,
        stock: prod.stock,
        __v: prod.__v}

        res.json(returnData)
    } catch (e) {
        console.log(e)
        return res.json({ msg: "Error de servidor, en getProductById" })
    }
}

export const getImgProductbyId = async(req,res) => {
    try {
        const id = req.params.id
        let isHex = /^[0-9A-F]{24}$/gi.test(id) //verificación que es un hex de 24 caracteres
        if (!isHex) {
            return res.status(400).json({ error: "no es un objectId" })
        }
        const prod = await Product.findById(id) //populate
        if (!prod) return res.status(404).json({ error: "not found product" })

        res.set('Content-Type', prod.img.contentType); 
        return res.send(prod.img.data)
    } catch (e) {
        console.log(e)
        return res.json({ msg: "Error de servidor, en getProductById" })
    }
}



export const postProduct = async (req, res) => {

    const {  name, description, stock, price, categories } = req.query
    // const store = await Store.findById(storeId)
    let array = categories.split(","); 
    array[0] = array[0].slice(1); 
    array[array.length -1] = array[array.length -1].slice(0,1)


    const image = req.files; 

    const product = await Product.findOne({ name })
    if (product) {
        return res.status(400).json({
            msg: `El producto ${product.name}, ya existe`
        })
    }
    const data = {
        name, description, stock, price, categories: array
    }
    const newProduct = new Product(data)
    newProduct.img.data = image.imageProduct.data; 
    newProduct.img.contentType = image.imageProduct.mimetype; 


    await newProduct.save()
    res.status(201).json({
        msg: newProduct
    })
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
    const { id } = req.params
    const product = await Product.findByIdAndRemove(id)
    res.status(200).json({
        msg: "Product deleted"
    })
}

export const upDate = async (req, res) => {
    try {
        const id = req.params.id
        const {  name, description, stock, price, categories } = req.query
        const image =  req.files

        let upDates = {
            name, description,stock, price, categories
        }

        if(image && image.imageProduct) {
            upDates.img = {}; 
            upDates.img.data = image.imageProduct.data;
            upDates.img.contentType = image.imageProduct.mimetype; 
        }


        const product = await Product.findByIdAndUpdate(id, upDates)
        if (!product) return res.json({ err: "not found product" })
        return res.json({ ok: "upDate Product" })
    } catch (error) {
        console.log(error)
        return res.json({ msg: "Error de servidor" })
    }
}


