import nodemailer from "nodemailer";

/* const config ={
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER, 
    pass: process.env.MAILTRAP_PASSWORD
  }
} */
const config ={
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "fastfoodhenry365@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN
  }
}

  const emailer = nodemailer.createTransport(config)
  export default emailer;