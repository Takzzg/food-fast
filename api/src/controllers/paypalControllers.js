import axios from 'axios'
import Payement from '../models/payement.js'
import {PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from '../../ultis/configPaypal.js'
import Product from '../models/product.js'

export const createOrden = async(req,res, next)=>{


 const {mount, description} = req.body; 
 // Necesito un arreglo --> Resumen de ordenes --> [{id: sakdjfas, newStock: stock-order}, {id: sas, items:}]
  try {
    
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: mount.toString()// El monto te llega 
              },
              description: description.toString() // Descriptcion del producto
            }
          ],
          application_context: {
            brand_name: "FoodFast",
            landing_page: 'LOGIN',
            user_action: 'PAY_NOW',
            return_url: 
            `http://localhost:3001/api/v1/paypal/captureOrder`,
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

    return res.json(response.data.links[1].href)
 } catch (error) {
   console.log(error)
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
 
    const payemOrder = payemInfo[0] 
      const order = new Payement({...payemOrder})
      await order.send_emailPayament()
      await order.save() 
       // Aqui reemplazar la dirección de la app
      return res.redirect('http://localhost:3000/user/succesPay/true')
      // return res.json(response.data)
    
    } catch (error) {
      console.log(error)
    }

}

export const cancelOrder= async(req,res, next)=>{
    return res.redirect('http://localhost:3000/products')
}


// https://www.sandbox.paypal.com/myaccount/summary

//USUARIO DE PRUEBA
//user: dsfsdklxjv@xogf.com
//password:  >3M>m62%
//USUARIO VENDEDOR DE PRUEBA
// user  jhonprueba@business.example.com
//password cL}b2V7@
