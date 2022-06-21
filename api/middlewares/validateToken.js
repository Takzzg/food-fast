import jwt from 'jsonwebtoken'

const verifyToken = (req,res,next)=>{
    //formato bearer
    let token = req.headers.authorization
    if(!token) return res.json({err: 'Acceso denegado',})
    token= token.split(' ')[1]
    try {
        const payload= jwt.verify(token, process.env.JWT_SECRET)
        req.uid = payload.uid
        next()
    } catch (error) {
        console.log(error.message)
        const  errosVerifyToken = {
            'invalid signature' : 'La firma del JWT no es valida',
            'jwt expired': 'JWT expirado',
            'invalid token': 'Token no valido',
            'jwt malformed': 'JWT formato no valido'
        }
        return res.json({error: errosVerifyToken[error.message]})
    }
}

export default verifyToken