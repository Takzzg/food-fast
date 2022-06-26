import User from "../models/user.js"

export const registerUser = async (req, res) => {
    //isGoogleAcount=true, verifyAccount=true, photo
    const {
        name,
        email,
        password,
        photo,
        uid,
        isGoogleAccount,
        verifyAccount
    } = req.body

    let user = await User.findOne({ email })
    if (user) return res.status(409).json({ err: "existing user" })

    try {
        if (photo && uid && isGoogleAccount && verifyAccount) {
            console.log("** REGISTRANDO USUARIO **")
            //por ahora el uid no lo está usando...
            user = new User({
                name,
                email,
                password,
                photo,
                uid,
                isGoogleAccount,
                verifyAccount
            })
        } else {
            user = new User({ name, email, password })
        }

        user.send_emailWelcome()

        await user.save()
        return res.json("Usuario registrado con éxito")
    } catch (error) {
        console.log(error)
        return res.status(400).json({ err: "Error server" })
    }
}

export const getUser = async (req, res) => {
    try {
        const { email } = req.query
        if (email) {
            const user = await User.find({ email })
            return res.status(200).send(user)
        }

        const user = await User.find()
        if (!user) {
            return res.status(400).json({
                msg: "No hay usuarios para mostrar"
            })
        }
        return res.status(200).json({
            user
        })
    } catch (e) {
        console.log(e)
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (e) {
        res.status(400).send("Error hijo")
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, address } = req.body
    try {
        const user = await User.findByIdAndUpdate(id, { name, address })
        res.json(user)
    } catch (e) {
        res.status(404).send("Error en updateUser. ", e.message)
    }
}

export const emailExists = async (req, res) => {
    try {
        let { email } = req.query
        let gUser = await User.findOne({ email: email })
        if (gUser) {
            console.log("el usuario EXISTE en el emailExists. Returning true")
            res.json({ exists: true })
        } else {
            console.log(
                "el usuario NO EXISTE en el emailExists. Returning false"
            )

            res.json({ exists: false })
        }
    } catch (e) {
        console.log("Error en emailExists. ", e)
        res.json({ exists: false })
    }
}


export const manageProducts = async (req,res) => {
    try{
        const { id } = req.params;

        const {product} = req.body; 
        console.log(product) 
        const Userfind = await User.findById(id); 
        let coincidence = Userfind.shopCart.find(el=>  el._id === product._id); 

        let data
        if(!coincidence) {
            data = [...Userfind.shopCart, product]
        } else {
            data = Userfind.shopCart.filter(el=> el._id !== product._id)
        }
        const update = await User.findByIdAndUpdate(id, {shopCart: data}, {new: true});
        res.send(update)
    } catch(e){
        res.status(400).send("Error")
    }
}

export const afterPay = async (req,res) => {
    try{
        const { id } = req.params; 
        const update = await User.findByIdAndUpdate(id, {shopCart: []}, {new: true});
        res.send(update)
    }catch(e){
        res.status(400).send("Error")
    }
}