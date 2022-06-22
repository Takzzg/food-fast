import mongoose from 'mongoose'

const payementSchema= new mongoose.Schema({
    orderId:{
        type: String,
    },
    status:{
        type: String,
    },
    payer:{
        type: String,
    },
    country_code:{
        type: String,
    },
    address_Area:{
        type: String,
    },
    payment_Currency_Code:{
        type: String
    },
    payment_Value:{
        type: String,
    }
});

const Payement = mongoose.model("Payement",payementSchema)
export default Payement;