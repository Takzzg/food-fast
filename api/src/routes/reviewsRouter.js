import express from "express"

import {
    deleteReview,
    getProductReviews,
    getUserReviews,
    postReview
} from "../controllers/reviewsController.js"

const router = express.Router()

router.post("/", postReview)

// get http://localhost:3001/api/v1/reviews/product/4312445/
router.get("/product/:id", getProductReviews)

// post http://localhost:3001/api/v1/reviews/user/4312445/
router.get("/user/:id", getUserReviews)

// delete http://localhost:3001/api/v1/reviews/4312445
router.delete("/:id", deleteReview)

export default router
