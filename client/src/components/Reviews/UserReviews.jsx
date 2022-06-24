import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUserReviews } from "../../redux/actions/async"
import ReviewCard from "./ReviewCard"

const UserReviews = () => {
    const { idUser } = useParams()

    const [reviews, setReviews] = useState([])
    const user = useSelector((state) => state.user.authData.user)

    useEffect(() => {
        getUserReviews(idUser).then((reviews) => setReviews(reviews))
    }, [idUser])

    const ReviewOverlay = ({ review }) => {
        if (user._id === idUser)
            return (
                <div className="overlay">
                    <button className="delete">Delete</button>
                    <button className="edit">Edit</button>
                    <ReviewCard key={review._id} review={review} />
                </div>
            )

        return <ReviewCard key={review._id} review={review} />
    }

    return (
        <div>
            <h1>user: {idUser}</h1>
            {reviews.length &&
                reviews.map((r) => <ReviewOverlay key={r._id} review={r} />)}
        </div>
    )
}

export default UserReviews
