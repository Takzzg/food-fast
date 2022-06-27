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
        return res.status(200).json(user)
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

export const updateUser = async (req,res)=> {
    const { id } = req.params; 
    const {name, address, rol} = req.body; //el "rol" solo lo recibe desde el "dar permisos" del dashboard
    try {
        //si se llama "updateUser" desde otro lado como la sección de editar perfil, el "rol" será "undefined"
      if(typeof rol === 'undefined'){//MI ERROR, comparaba con undefined, y no con el string 'undefined'. SOLUCIONADO

        //dentro de este if, la función queda igual a cuando sólo editaba nombre y adress.
        const user = await User.findByIdAndUpdate(id, {name, address}, {new: true})//{new:true} añadido
        res.json(user); 
      }else{
        //dentro de este else, se updatea sólo el rol, cuando 
        //"rol" ya no es undefined (request desde el Dashboard)
        const user = await User.findByIdAndUpdate(id, {rol})
        res.json(user);
      }
    }catch(e){
      res.status(404).send("Error en updateUser. ", e.message)
    }
  }

export const emailExists = async (req, res) => {
    try {
        let { email } = req.query
        let gUser = await User.findOne({ email: email })
        if (gUser) {
            res.json({ exists: true })
        } else {
            res.json({ exists: false })
        }
    } catch (e) {
        console.log("Error en emailExists. ", e)
        res.json({ exists: false })
    }
}


export const addItemCard = async (req,res) => {
    try{
        const { id } = req.params;

        const {product} = req.body; 

        const Userfind = await User.findById(id); 
        let coincidence = Userfind.shopCart.find(el=>  el._id === product._id); 
        let index = Userfind.shopCart.findIndex(el=> el._id === product._id); 

        let data
        if(!coincidence) {
            let newProduct = {...product, quantity: 1}
            data = [...Userfind.shopCart, newProduct]
        } else {
            data = [...Userfind.shopCart]
            data[index] = {...coincidence, quantity: coincidence.quantity + 1}
        }
        const update = await User.findByIdAndUpdate(id, {shopCart: data}, {new: true});
        res.send(update)
    } catch(e){
        res.status(400).send("Error")
    }
}

export const removeCarItem = async (req,res)=> {
    try{
        const { id } = req.params;
        const {product} = req.body; 

        const Userfind = await User.findById(id); 
        let coincidence = Userfind.shopCart.find(el=>  el._id === product._id); 
        let index = Userfind.shopCart.findIndex(el=> el._id === product._id); 

        let data
        if(coincidence.quantity <= 1) {
            data = Userfind.shopCart.filter(el=> el._id !== product._id)
        } else {
            data = [...Userfind.shopCart]
            data[index] = {...coincidence, quantity: coincidence.quantity - 1}
        }

        const update = await User.findByIdAndUpdate(id, {shopCart: data}, {new: true});
        res.send(update)
    } catch(e){
        res.status(400).send("Error")
    }
}

export const removeAllSameItems = async (req,res) => {
    try {
        const { id } = req.params;
        const {product} = req.body; 
        const Userfind = await User.findById(id); 
        let data = Userfind.shopCart.filter(el=> el._id !== product._id)
        const update = await User.findByIdAndUpdate(id, {shopCart: data}, {new: true});
        res.send(update)
    } catch(e) {
        res.status(400).send("Error")
    }
}


export const cleanCar = async (req,res) => {
    try{
        const { id } = req.params; 
        const update = await User.findByIdAndUpdate(id, {shopCart: []}, {new: true});
        res.send(update)
    }catch(e){
        res.status(400).send("Error")
    }
}

export const addPrevItemsAuth = async (req,res) => {
    try{
        const {id} = req.params; 
        const {products} = req.body;
        const Userfind = await User.findById(id);
        if (Userfind.shopCart.length === 0){
            const update = await User.findByIdAndUpdate(id, {shopCart: products}, {new: true}); 
            return res.send(update)
        }
        res.send("El usuario ya tiene carrito")
    }catch(e){
        res.status(400).send("Error")
    }
}

export const deleteUser = async (req, res)=>{
    try{
      const { id } = req.params
      await User.findByIdAndRemove(id)
      res.status(200).send("Usuario removido.")
    }catch(e){
      console.log("Error en deleteUser controller. ",e)
    }
  }