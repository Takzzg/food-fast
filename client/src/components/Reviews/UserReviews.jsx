import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { deleteReview, getUserReviews } from "../../redux/actions/async"
import ReviewCard from "./ReviewCard"
import { StyledUserReviews } from "./Reviews.styled"

const UserReviews = () => {
    const { idUser } = useParams()

    const [reviews, setReviews] = useState([])
    const user = useSelector((state) => state.user.authData.user)

    const fetchReviews = () => {
        getUserReviews(idUser).then((res) => setReviews(res))
    }

    useEffect(() => {
        getUserReviews(idUser).then((res) => setReviews(res))
    }, [idUser])

    const handleDeleteReview = (id) => {
        deleteReview(id).then(() => fetchReviews())
    }

    return (
        <StyledUserReviews>
            <h1>user: {user.name}</h1>
            <div className="reviews">
                {reviews.length &&
                    reviews.map((r) => (
                        <ReviewCard
                            key={r._id}
                            review={r}
                            handleDelete={handleDeleteReview}
                        />
                    ))}
            </div>
        </StyledUserReviews>
    )
}

export default UserReviews