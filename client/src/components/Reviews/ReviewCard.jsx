import React, { useState } from "react"
import { useSelector } from "react-redux"
import { StyledReviewCard } from "./Reviews.styled"
import { FaTrashAlt, FaUserAlt } from "react-icons/fa"
import { IoFastFoodSharp } from "react-icons/io5"
import { BsArrowRight, BsFillStarFill } from "react-icons/bs"
import { FiClock } from "react-icons/fi"
import dateFormat from "dateformat"

const ReviewCard = ({ review, handleDelete }) => {
    const [userData, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    )
    const user = useSelector((state) => state.user.authData?.user)
    const theme = useSelector((state) => state.theme.selectedTheme)

    return (
        <StyledReviewCard theme={theme}>
            {(userData?.user?.rol === "ADMIN" ||
                (user && user._id === review.userId._id)) && (
                <div
                    onClick={() => handleDelete(review._id)}
                    className="deleteBtn"
                >
                    <FaTrashAlt />
                    Borrar
                </div>
            )}

            <div className="card">
                <span className="header">
                    <span className="title">{review.title}</span>
                    <span className="score">
                        <span className="icon">
                            <BsFillStarFill />
                        </span>
                        {review.score}/5
                    </span>
                </span>
                <span className="comment">{review.comment}</span>
                <span className="info">
                    <span className="author">
                        {review.userId && review?.userId.name} <FaUserAlt />{" "}
                        <BsArrowRight />
                        <IoFastFoodSharp /> {review?.productId?.name}
                    </span>
                    <span className="date">
                        <FiClock />
                        {dateFormat(review.date, "dd/mm/yyyy")}
                    </span>
                </span>
            </div>
        </StyledReviewCard>
    )
}

export default ReviewCard
