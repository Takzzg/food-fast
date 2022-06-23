import User from "../models/user.js"


export const registerUser = async(req,res) =>{
  const {name,email,password}=req.body;
  try{
    let user = await User.findOne({email})

    if(user) return res.json({err: "existing user"})
    user = new User({name,email,password})
    user.send_emailWelcome()

    await user.save()
    return res.json("Usuario registrado con éxito")
  }catch(error){
    console.log(error)
    return res.status(400).json({err: "Error server"})
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

export const getUserById = async (req, res)=> {
  const {id} = req.params; 
  try{
    const user = await User.findById(id); 
    res.json(user)
  }catch(e){
    res.status(400).send("Error hijo")
  }
}

export const updateUser = async (req,res)=> {
  const { id } = req.params; 
  const {name, address} = req.body; 
  try {
    const user = await User.findByIdAndUpdate(id, {name, address})
    res.json(user); 
  }catch(e){
    res.status(404).send("Error hijo")
  }
}