
import nodemailer from "nodemailer";

export const sendEmail = async (email, name , id, token) => {
    try {
        const transporter = nodemailer.createTransport({
    
            host:"smtp.mailtrap.io",
                 port:2525,
             
               auth:{
                    user:process.env.USER,
                    pass:process.env.PASSWORD
           }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject:"Password reset for " + email,
            html:`<p> Hello, ` + name +  `. Please  copy the link and <a href="http://localhost:3001/api/v1/auth/reset-password/${id}/${token}">reset your password</a>`       

        });

        console.log("email fue enviado correctamente");
    } catch (error) {
        console.log("Error en el sendEmail. ",error);
    }
};