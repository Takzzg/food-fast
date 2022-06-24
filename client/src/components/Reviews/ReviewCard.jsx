import React, { useState } from "react"
import { useSelector } from "react-redux"
import { StyledReviewCard } from "./Reviews.styled"

const ReviewCard = ({ review, handleDelete }) => {
    const [userData, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    )
    const user = useSelector((state) => state.user.authData.user)

    return (
        <StyledReviewCard>
            {(userData?.user?.rol === "ADMIN" ||
                user._id === review.userId._id) && (
                <div className="overlay">
                    <button
                        onClick={() => handleDelete(review._id)}
                        className="delete"
                    >
                        Delete
                    </button>
                    <button className="edit">Edit</button>
                </div>
            )}

            <div className="card">
                <span className="header">
                    <span className="title">{review.title}</span>
                    <span className="score">{review.score}/5</span>
                </span>
                <span className="comment">{review.comment}</span>
                <span className="info">
                    <span className="author">
                        {review.userId.name} {"->"} {review.productId.name}
                    </span>
                    <span className="date">{review.date}</span>
                </span>
            </div>
        </StyledReviewCard>
    )
}

export default ReviewCard
