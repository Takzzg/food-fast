import express from 'express';
import User from "../models/user.js"
import { sendEmail } from "../../ultis/nodemailerReset.js"
import {generateToken} from '../../ultis/token.js'

const router = express.Router()

export const login = async(req,res)=>{
    const {email, password} = req.body
    try{
      let user = await User.findOne({email})
      if(!user) return res.json({err: "not found user"})
      const passwordCandidate = await user.comparePassword(password)
      if(!passwordCandidate) return res.json({err:"invalid credential"})
      
      //token
      const {token, expiresIn} = generateToken(user.id)
     
      return res.header('auth-token', token).json({
        error: null,
        data: {token, expiresIn} 
    })
  
    }catch(error){
      console.log(error)
      return res.json({error: "Error server"})
    }
  }

  export const forgotPass = async (req, res) => {
    const {email}=req.body

   const user=await User.findOne({email})
    if(!user){
         res.json("user not registered")
         return
    }
    const secret=process.env.SECRETOPRIVATEKEY + user.password
    const payload={
        email:user.email,
        id:user.id
    }
    const token=jwt.sign(payload,secret,{expiresIn:"2h"})
    //   const link=`http://localhost:3001/api/v1/auth/reset-password/${user.id}/${token}`
    //   console.log(link)
      sendEmail(email,user.name,user.id,token)

      res.json({
        msg:"Password reset link has been sent to your email"
    })
}

export const resetGetPass = async (req, res) => {
  const {id,token}=req.params
  
  const userId=await User.findById(id)
  if(!id){
   res.json({
       msg:"Invalid id"
   })
   return
  }
  const secret=process.env.SECRETOPRIVATEKEY + userId.password
  try{
      const payload=jwt.verify(token,secret)
      return res.json({email:userId.email})
  }catch(e){
   console.log(e)
  }
}

export const resetPostPass = async (req, res) => {
  const {id,token}=req.params
  const {password}=req.body

  const userId=await User.findById(id)
  if(!id){
   res.json({
       msg:"Invalid id"
   })
   return
  }
  //  const secret=process.env.SECRETOPRIVATEKEY + userId.password
  try{
      //  const payload=jwt.verify(token,secret)
      
      userId.password=password
      
      const salt=bcryptjs.genSaltSync()
      userId.password=bcryptjs.hashSync(password,salt);
      const saved=new User(userId)

       await saved.save()
       res.json(userId)
  }catch(e){
   console.log(e)
  }
}

//prueba
 export const prueba = async(req,res)=>{
    const requ = {user: req.user}
    const user = await User.findById(req.uid)
    console.log("estoy en prueba",user)
    return res.json(user)
  }