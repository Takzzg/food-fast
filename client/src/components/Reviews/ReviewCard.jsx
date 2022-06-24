import React from "react"

const ReviewCard = ({ review }) => {
    return (
        <div>
            {review.title}
            {review.comment}
            {review.userId.name} {"->"} {review.productId.name}
        </div>
    )
}

export default ReviewCard
