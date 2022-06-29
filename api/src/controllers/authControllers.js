import express from "express"
import User from "../models/user.js"
import emailer from "../../ultis/email.js"
import Token from "../models/token.js"
import { generateToken } from "../../ultis/token.js"
import jwt from "jsonwebtoken"

const router = express.Router()

const apiBaseUrl = `${
    process.env.NODE_ENV === "production"
        ? "https://food-fast-api.herokuapp.com"
        : "http://localhost:3001"
}/api/v1`
const cliBaseUrl = `${
    process.env.NODE_ENV === "production"
        ? "https://food-fast-client.vercel.app"
        : "http://localhost:3000"
}`

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) return res.status(404).json({ err: "not found user" })

        // if(!user.verifyAccount) return res.json({err: "please verify your account"})

        const passwordCandidate = await user.comparePassword(password)
        if (!passwordCandidate)
            return res.status(404).json({ err: "invalid credential" })

        //token
        const token = generateToken(user._id)

        return res.status(200).json({ user, token })
        /* res.header('auth-token', token).json({
      error: null,
      data: {token, expiresIn} } )*/
    } catch (error) {
        console.log("Error en login controller. ", error)
        return res.json({ error: "Error server" })
    }
}

export const forgotPass = async (req, res) => {
    try {
        const { email } = req.body.email

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({ error: "user not registered" })
        }
        const secret = process.env.SECRETOPRIVATEKEY + user.password
        const payload = {
            email: user.email,
            id: user._id
        }
        const token = jwt.sign(payload, secret, { expiresIn: "1h" })

        const link = `${apiBaseUrl}/auth/reset-password/${user.id}/${token}`

        /*     const emailOptions = {
        from: 'FoodFAST',
        to: email,
        subject: "Password reset link",
        html: `
        <div style='background-color: #333;
            display: flex; 
            justify-content: center; 
            align-items: center;
            flex-direction: column;
            height: 250px; 
            font-family: sans-serif'>

            <h1 style='color: #ddd; 
            padding-bottom: 3px;
            border-bottom: 2px solid #eee'>Fast Food inc.</h1>

            <h3 style='color: #ccc'>Dear ${user.name}, click below to reset your password! :D</h3>

            <a style='text-decoration: none; 
            color: lightgreen;
            padding: 8px; 
            border: 3px solid darkgreen;
            border-radius: 7px' href=${link}> Click here </a>
        </div>
        ` } 
    await emailer.sendMail(emailOptions);
    console.log("Correo enviado!!!") */

        console.log("\t♥******* ♦ LINK DEBAJO ♦ ********♥\n", link)

        res.json({
            msg: "Password reset link has been sent to your email"
        })
    } catch (e) {
        console.log("error en el forgotPass. ", e)
    }
}

export const resetGetPass = async (req, res) => {
    const { id, token } = req.params

    const userId = await User.findById(id)
    if (!id) {
        res.status(404).send({
            msg: "User id don't exists"
        })
        return
    }
    const secret = process.env.SECRETOPRIVATEKEY + userId.password
    try {
        const payload = jwt.verify(token, secret)
        //si pasa a la línea del return, es porque el jwt.verify fue exitoso
        return res.redirect(
            `${cliBaseUrl}/newPassword?email=${userId.email}&id=${id}&token=${token}`
        )
    } catch (e) {
        console.log("Error en el resetGetPass. ", e)
    }
}

export const resetPostPass = async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body

    const userId = await User.findById(id)
    if (!id) {
        res.status(404).json({
            msg: "Invalid id"
        })
        return
    }
    const secret = process.env.SECRETOPRIVATEKEY + userId.password
    try {
        const payload = jwt.verify(token, secret)

        userId.password = password

        /* const salt = bcryptjs.genSaltSync()
        userId.password = bcryptjs.hashSync(password, salt) */ //probar si el modelo encripta automatico
        const saved = new User(userId)

        await saved.save()
        res.json(userId)
    } catch (e) {
        console.log("Error en resetPostPass. ", e)
    }
}

export const confirmToken = async (req, res) => {
    const tokenId = req.params.tokenId
    try {
        const token = await Token.findOne({ token: tokenId })
        if (!token) return res.send("not found Token")
        const user = await User.findById(token._userId)
        if (!user) return res.send("not found User")
        if (user.verifyAccount) return res.send("user verify account")
        ;(user.verifyAccount = true), await user.save()
        return res.send("account user verify")
    } catch (error) {
        console.log("Error en confirmToken. ", error)
        return res.json({ err: error })
    }
}

//prueba
export const prueba = async (req, res) => {
    const requ = { user: req.user }
    const user = await User.findById(req.uid)
    console.log("estoy en prueba", user)
    return res.json(user)
}
