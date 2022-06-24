import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductReviews, postReview } from "../../redux/actions/async"
import ReviewCard from "./ReviewCard"

const initialState = {
    title: "",
    comment: "",
    score: ""
}

const Reviews = () => {
    const { idProduct } = useParams()

    const [reviews, setReviews] = useState([])
    const [reviewForm, setReviewForm] = useState(initialState)
    const userId = useSelector((state) => state.user.authData.user._id)

    const fetchReviews = () => {
        getProductReviews(idProduct).then((reviews) => setReviews(reviews))
    }

    useEffect(() => {
        getProductReviews(idProduct).then((reviews) => setReviews(reviews))
    }, [idProduct])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newReview = {
            ...reviewForm,
            date: new Date(),
            userId,
            productId: idProduct
        }
        postReview(newReview).then(() => fetchReviews())
    }

    const handleFormChange = (e) => {
        setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <span className="title">Reviews</span>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Titulo</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={reviewForm.title}
                    onChange={handleFormChange}
                />
                <label htmlFor="comment">Comentario</label>
                <input
                    type="text"
                    name="comment"
                    id="comment"
                    value={reviewForm.comment}
                    onChange={handleFormChange}
                />
                <label htmlFor="score">Puntaje</label>
                {[1, 2, 3, 4, 5].map((v) => (
                    <input
                        key={v}
                        type="radio"
                        name="score"
                        value={v}
                        id={v}
                        onClick={handleFormChange}
                    />
                ))}
                <input type="submit" value="Enviar" />
            </form>
            {reviews.length &&
                reviews.map((r) => <ReviewCard key={r._id} review={r} />)}
        </div>
    )
}

export default Reviews
