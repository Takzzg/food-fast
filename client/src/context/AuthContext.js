import { useContext, createContext, useEffect, useState } from "react"
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged
} from "firebase/auth"
import { auth } from "../firebase/config.js"
import { logup } from "../redux/actions/async.js"
import { useDispatch } from "react-redux"
import axios from "axios"

const AuthContext = createContext()

const registerGoogleAccount = (currentUser) => async (dispatch) => {
    try {
        const resp = await axios.get(
            `${process.env.REACT_APP_BACK_URL}/api/v1/user/verify/exists?email=${currentUser.email}`
        )
        const gUser = resp.data
        if (!gUser.exists) {
            //lo registramos...
            dispatch(
                logup({
                    name: currentUser.displayName,
                    email: currentUser.email,
                    password: currentUser.uid,
                    passwordConfirm: currentUser.uid,
                    uid: currentUser.uid,
                    photo: currentUser.photoURL,
                    isGoogleAccount: true,
                    verifyAccount: true
                })
            )
        } else {
            console.log("YA TIENES ESTA GOOGLE ACCOUNT GUARDADA")
        }
    } catch (e) {
        console.log("Error en registerGoogleAccount. ", e)
    }
}

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const provider = new GoogleAuthProvider()

    const googleSignIn = () => signInWithPopup(auth, provider)

    // const googleSignIn = () => {
    //     const provider = new GoogleAuthProvider()
    //     // signInWithPopup(auth, provider)
    //     signInWithRedirect(auth, provider)
    // }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(registerGoogleAccount(currentUser))
            }
            setUser(currentUser)
            //console.log("User del onAuthStateChanged: ", currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
