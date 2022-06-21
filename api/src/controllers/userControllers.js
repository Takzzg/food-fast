import User from "../models/user.js"

export const registerUser = async(req,res) =>{
  const {name,email,password,rol}=req.body;
  try{
    let user = await User.findOne({email})
    if(user) return res.json({err: "existing user"})
    user = new User({name,email,password,rol})
    //user.email_Welcome()
    await user.save()
    return res.json(user)
  }catch(error){
    console.log(error)
    return res.json({err: "Error server"})
  }  
}

export const getUser = async(req,res) =>{
  try{
    const user=await User.find()
    if(!user){
      return res.status(400).json({
        msg:"No hay usuarios para mostrar"
      })
    }
    return res.status(200).json({
      user
    })
  }catch(e){
    console.log(e)
  }
}