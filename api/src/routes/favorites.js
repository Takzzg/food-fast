import express from "express"
import Favorites from "../models/favorites.js";

const router = express.Router(); 

router.get('/', async (req , res)=> {
    const results = await Favorites.find(); 
    res.send(results)
})

router.get('/:userID', async (req,res)=> {
    const { userID } = req.params; 
    try {
        const favoritesUser = await Favorites.findOne({userID})
        res.send(favoritesUser)
    } catch(e) {
        res.status(404).send("Bad ending mi pejerrey :C")
    }
})

router.post('/:userID', async (req,res)=> {
    const { userID } = req.params;
    const { idProduct } = req.body; 
    const Coincidence = await Favorites.findOne({userID})
    if(Coincidence) {
        let sameProduct = Coincidence.products.find(el=> el === idProduct); 
        let newProducts
        if (sameProduct) {
            newProducts = Coincidence.products.filter(el=> el !== idProduct)
        } else {
            newProducts = [...Coincidence.products, idProduct];
        }
        let favorite = await Favorites.findByIdAndUpdate(Coincidence._id, {products: newProducts}, {new: true})
        res.json(favorite)
    } else {
        const data = {userID, products: [idProduct]}
        let newFavorites = new Favorites(data)
        await newFavorites.save()
        res.status(201).json({
            msg: newFavorites
        })
    }
})

// clean all favorites list
router.delete('/delete/:userID', async (req,res)=> {
    const {userID} = req.params; 
    const Coincidence = await Favorites.findOne({userID})

    let favorite = await Favorites.findByIdAndUpdate(Coincidence._id, {products: []}, {new: true})
    res.send(favorite)
})
export default router; 