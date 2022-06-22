import mongoose from 'mongoose'

const tokenSchema= new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  token: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    required:true,
    default:new Date(),
    expires: 43200,
  }
})

const Token = mongoose.model("Token",tokenSchema)
export default Token;