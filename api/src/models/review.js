import mongoose from "mongoose"
const Schema = mongoose.Schema

const reviewSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        date: Date,
        score: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        comment: String
    },
    {
        timestamps: true
    }
)
const Review = mongoose.model("Review", reviewSchema)
export default Review
