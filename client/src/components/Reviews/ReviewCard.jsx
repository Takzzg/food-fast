import React from "react"
import { StyledReviewCard } from "./Reviews.styled"

const ReviewCard = ({ review }) => {
    return (
        <StyledReviewCard>
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
        </StyledReviewCard>
    )
}

export default ReviewCard
