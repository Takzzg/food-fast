import mongoose from 'mongoose'
import emailer from '../../ultis/email.js'

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


payementSchema.methods.send_emailPayament = async function(){
try {
    const email_destination = this.payer;
    console.log(email_destination)
    const emailOptions = {
        from: 'FooodFAST',
        to: email_destination,
        subject: "check e-mail",
        html: `
        <h2>Muchas Gracias por su Compra</h2>
        <p>value : ${this.payment_Value}</p>` 
    };

    let email = await emailer.sendMail(emailOptions)
    console.log("ok message payementOrder")
} catch (error) {
    console.log(error)
}
}

const Payement = mongoose.model("Payement",payementSchema)
export default Payement;