import Review from "../models/review.js"
import Product from "../models/product.js"

export const getProductReviews = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(500).send({ error: "No Id" })

    let reviews = []
    reviews = await Review.find({ productId: id })
        .populate("userId", "name")
        .populate("productId", "name")

    res.send(reviews)
}

export const getUserReviews = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(500).send({ error: "No Id" })

    let reviews = []
    reviews = await Review.find({ userId: id })
        .populate("userId", "name")
        .populate("productId", "name")

    res.send(reviews)
}

export const postReview = async (req, res) => {
    const { productId, userId, title, comment, score, date } = req.body

    if (!productId || !userId || !title || !score)
        return res.status(500).send({ error: "Missing Info" })
    const prevReviews = await Review.find({ productId }); 
    
    if(prevReviews.length > 0) {
        let acc = score; 
        for (let i = 0; i < prevReviews.length; i++) {
            acc = acc + Number(prevReviews[i].score); 
        }
        let newRating = acc/(prevReviews.length + 1); 
        await Product.findByIdAndUpdate(productId, {rating: newRating})
    } else {
        await Product.findByIdAndUpdate(productId, {rating: score})
    }
    const reviewData = { productId, userId, title, comment, score, date }
    const newReview = new Review(reviewData)
    await newReview.save()

    res.status(201).send(newReview)
}

export const deleteReview = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(500).send({ error: "no Id" })
    const deleteReview = await Review.findByIdAndDelete(id);
    console.log(deleteReview)

    const idP = deleteReview.productId
    const prevReviews = await Review.find({ productId: idP }); 
    if(prevReviews.length > 0) {
        let acc = 0; 
        for (let i = 0; i < prevReviews.length; i++) {
            acc = acc + Number(prevReviews[i].score); 
        }
        let newRating = acc/prevReviews.length; 
        await Product.findByIdAndUpdate(idP, {rating: newRating})
    } else {
        await Product.findByIdAndUpdate(idP, {rating: 0})
    }
    
    res.status(200).send("review deleted")
}
