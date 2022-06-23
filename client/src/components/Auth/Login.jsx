import React, { useState } from "react"
import { Container, LoginBox, GoogleButton, ErrorP } from "./Login.styled"
import { IoFastFoodSharp } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { login, googleLogin } from "../../redux/actions/async"
import { useEffect } from "react"
import { UserAuth } from "../../context/AuthContext"

//Validación
function validate(input) {
    let errors = {}
    if (!input.email) {
        errors.email = "Tu correo es requerido."
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = "Debe ser un e-mail"
    }
    if (!input.password) {
        errors.password = "Tu contraseña es requerida."
    } else if (input.password.length < 4) {
        errors.password = "contraseña demasiado corta"
    } else if (/[^A-z\s\d][\\]?/g.test(input.password)) {
        errors.password = "No puede contener caracteres especiales."
    }
    return errors
}

export default function Login() {
    //const { logOut} = UserAuth();
    const { googleSignIn, user } = UserAuth()
    const Navigate = useNavigate()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const authData = useSelector((state) => state.user.authData)
    function handleInputChange(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({ ...input, [e.target.name]: e.target.value }))
    }

    const handleGoogleLogin = async (e) => {
        e.preventDefault()
        try {
            await googleSignIn().then(() => {
                Navigate("/")
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (authData?.token) {
            toast.success(`Bienvenido ${authData.user.name}!!`)
            Navigate("/")
        } else if (authData?.error) {
            toast.error("Contraseña o usuario incorrectos.")
        }
    }, [authData])

    function handleSubmit(e) {
        try {
            e.preventDefault()
            if (Object.keys(errors).length > 0) {
                toast.error("Debes completar correctamente los campos.")
            } else {
                dispatch(login(input))
            }
        } catch (e) {
            console.log(e)
            toast.error("Contraseña o usuario incorrecto.")
        }
    }

    return (
        <Container>
            <LoginBox>
                <IoFastFoodSharp />
                <h1>Login here</h1>
                <form onSubmit={handleSubmit}>
                    
                    <label>Username (e-mail)</label>
                    <input
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        value={input.email}
                        placeholder="Enter a e-mail..."
                        
                    />
                    {errors.email && <ErrorP>{errors.email}</ErrorP>}
                    <br />
                    
                    <label>Password</label>
                   
                    <input
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        value={input.password}
                        placeholder="Enter your password..." 
                    />
                 
                    {errors.password && <ErrorP>{errors.password}</ErrorP>}
                    <input type="submit" value="Log In" />
                    <span
                        style={{
                            fontSize: "16px",
                            fontFamily: "sans-serif",
                            marginLeft: "120px"
                        }}
                    >
                        or
                    </span>
                    <GoogleButton onClick={(e) => handleGoogleLogin(e)}>
                        <img
                            className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="google button"
                        />
                        <span className="btn-text">
                            <b>Sign in with Google</b>
                        </span>
                    </GoogleButton>
                    <Link to="/passwordReset" className="anchor">
                        Forgot your password?
                    </Link>{" "}
                    <br />
                    <Link to="/logup" className="anchor">
                        No registered yet? Sign Up now!
                    </Link>
                </form>
            </LoginBox>
        </Container>
    )
}
