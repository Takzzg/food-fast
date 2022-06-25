import nodemailer from "nodemailer";

const config ={
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD
  }
}

  const emailer = nodemailer.createTransport(config)
  export default emailer;