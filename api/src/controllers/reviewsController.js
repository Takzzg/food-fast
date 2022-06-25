import Review from "../models/review.js"

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

    const reviewData = { productId, userId, title, comment, score, date }
    const newReview = new Review(reviewData)
    await newReview.save()

    res.status(201).send(newReview)
}

export const deleteReview = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(500).send({ error: "no Id" })
    await Review.findByIdAndDelete(id)
    res.status(200).send("review deleted")
}
