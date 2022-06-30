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
    //BUENO quedaría ver conseguir el e-mail del usuario logueado actualmente :c
    //ya que este "payer" lo provee la pasarela de PayPal, y tiene correo de prueba siempre xd
    const emailOptions = {
        from: "🍕🍔 Food's Universe inc. 🍕🍔<fastfoodhenry365@gmail.com>",
        to: email_destination,
        subject: "Correo de confirmación de compra",
        html: `
        <div style='background-color: #333;
            height: 250px;
            width: 100%; padding-bottom: 3px;
            font-family: sans-serif'>
            
            <h1 style='color: #ddd;
            margin-left: 35%;'>Food's Universe inc.</h1> 

            <div style='border-bottom: 2px solid #eee'></div>
            <br/>

            <h3 style='color: #ccc; margin-left: 25%;'>
                Estimado usuario ${this.payer}, Gracias por su compra! :D
            </h3>
            <br/>

            <p style=' 
            color: lightgreen;
            padding: 8px; 
            border: 3px solid darkgreen;
            border-radius: 7px;
            margin-left: 35%;'> Monto : ${this.payment_Value} </p>
        </div> ` 
    };

    let email = await emailer.sendMail(emailOptions)
    console.log("ok message payementOrder", email.envelope)
} catch (error) {
    console.log(error)
}
}

const Payement = mongoose.model("Payement",payementSchema)
export default Payement;