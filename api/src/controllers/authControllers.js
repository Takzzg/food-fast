import express from "express"
import User from "../models/user.js"
import { sendEmail } from "../../ultis/nodemailerReset.js"
import Token from "../models/token.js"
import { generateToken } from "../../ultis/token.js"

const router = express.Router()

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
        console.log(error)
        return res.json({ error: "Error server" })
    }
}

export const forgotPass = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.json("user not registered")
    }
    const secret = process.env.SECRETOPRIVATEKEY + user.password
    const payload = {
        email: user.email,
        id: user.id
    }
    const token = jwt.sign(payload, secret, { expiresIn: "2h" })
    //   const link=`http://localhost:3001/api/v1/auth/reset-password/${user.id}/${token}`
    //   console.log(link)
    sendEmail(email, user.name, user.id, token)

    res.json({
        msg: "Password reset link has been sent to your email"
    })
}

export const resetGetPass = async (req, res) => {
    const { id, token } = req.params

    const userId = await User.findById(id)
    if (!id) {
        res.json({
            msg: "Invalid id"
        })
        return
    }
    const secret = process.env.SECRETOPRIVATEKEY + userId.password
    try {
        const payload = jwt.verify(token, secret)
        return res.json({ email: userId.email })
    } catch (e) {
        console.log(e)
    }
}

export const resetPostPass = async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body

    const userId = await User.findById(id)
    if (!id) {
        res.json({
            msg: "Invalid id"
        })
        return
    }
    //  const secret=process.env.SECRETOPRIVATEKEY + userId.password
    try {
        //  const payload=jwt.verify(token,secret)

        userId.password = password

        const salt = bcryptjs.genSaltSync()
        userId.password = bcryptjs.hashSync(password, salt)
        const saved = new User(userId)

        await saved.save()
        res.json(userId)
    } catch (e) {
        console.log(e)
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
        console.log(error)
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
