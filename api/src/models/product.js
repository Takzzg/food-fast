import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        public_id: String,
        secure_url: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    available: {
        type: Boolean,
        // required:true,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0
    }
})

const Product = mongoose.model("Product", productSchema)
export default Product
