import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import crypto from 'crypto'
import emailer from '../../ultis/email.js'

import Token from './token.js'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        default:"USER",
        enum:["ADMIN", "USER", "GUEST", "OWNER"]

    },
    isGoogleAccount:{
        type: Boolean,
        required: true,
        default: false
    },
    shopCart: {
        type: Array,
        default: []
    },
   address:{
       type:String,   
       default: "EE UU"
   },
   passwordReset: String,
   passwordResetTokenExpire: Date,
   verifyAccount:{
        type: Boolean, 
        default: false,
   }
    
})

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next()
    try{
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    }catch(error){
        console.log(error)
        throw new Error ("Error bcrypt password")
    }
})

userSchema.methods.comparePassword = async function(passwordCandidate){
    return await bcrypt.compare(passwordCandidate, this.password)
}

userSchema.methods.send_emailWelcome = async function (cb){
    const tokenVerify = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    tokenVerify.save( (err)=>{
        if(err) { return console.log(err.message)}

        const emailOptions = {
            from: 'FooodFAST',
            to: email_destination,
            subject: "check e-mail",
            html: `<a href= "http://localhost:3001/api/v1/auth/tokenConfirmed/${tokenVerify.token}">verifique su cuenta aqui</a>` 
        };
        emailer.sendMail(emailOptions, (err)=>{
            if(err){return console.log(err.message)};
            console.log("A verification email has been sent to ", email_destination)
        })
    }) 
}
const User = mongoose.model("User",userSchema)
export default User;