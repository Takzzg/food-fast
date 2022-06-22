import axios from 'axios'
import Payement from '../models/payement.js'
import {PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from '../../ultis/configPaypal.js'

export const createOrden = async(req,res, next)=>{
 const value = req.body.value; 
  try {
    
    const order = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
              "amount": {
                "currency_code": "USD",
                "value": value
              }
            }
          ],
          application_context: {
            brand_name: "FoodFast",
            landing_page: 'LOGIN',
            user_action: 'PAY_NOW',
            return_url: 
            'http://localhost:3001/api/v1/paypal/captureOrder',
            cancel_url: 
            'http://localhost:3001/api/v1/paypal/cancelOrder'
          }
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

     const {data : { access_token}} = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      });

    const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders`,order,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
    
    return res.json(response.data)
    

 } catch (error) {
    return res.status(500).send("error server")
 }
}


export const captureOrder= async(req,res, next)=>{
    try {
      
      const { token } = req.query;
      const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {},
        {
            auth: {
              username: PAYPAL_API_CLIENT,
              password: PAYPAL_API_SECRET,
            },
    })

    const dataResponse = [response.data]
    const payemInfo = dataResponse.map(e =>{ return {
      orderId:e.id, 
      status: e.status, 
      payer: e.payer.email_address, 
      country_code: e.purchase_units[0].shipping.address.country_code, 
      address_Area: e.purchase_units[0].shipping.address.admin_area_1,
      payment_Currency_Code: e.purchase_units[0].payments.captures[0].amount.currency_code,
      payment_Value : e.purchase_units[0].payments.captures[0].amount.value,

    }})
  
    await Payement.create(payemInfo)
   
    return res.json({ok: "gracias por su compra"})

    } catch (error) {
      console.log(error)
    }
}

export const cancelOrder= async(req,res, next)=>{
    return res.json({ok: "compra cancelada"})
}


// https://www.sandbox.paypal.com/myaccount/summary

//USUARIO DE PRUEBA
//user: sb-5lagt17329460@personal.example.com 
//password: )!yz(6C]
//USUARIO VENDEDOR DE PRUEBA
// user  jhonprueba@business.example.com
//password cL}b2V7@
