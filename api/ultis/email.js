import nodemailer from "nodemailer";

const config ={
   host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "40a23641bee634",
    pass: "e2912808f1d76e"
  }
  }

  const emailer = nodemailer.createTransport(config)
  export default emailer;