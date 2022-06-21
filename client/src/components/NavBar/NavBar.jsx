import React, { useState, useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
// import React, { useState } from "react"
import { Link } from "react-router-dom"

import {
    GlobalContainer,
    MainIconContainer,
    NavBarContainer,
    LoginRegisterButton,
    Title,
    ButtonsContainer,
    OpenButton,
    CloseButton,
    Divider
} from "./NavBar.styled"
import { IoFastFoodSharp } from "react-icons/io5"
/* import { FaUserAlt } from "react-icons/fa" */
import { GiHamburgerMenu } from "react-icons/gi"
import { AiFillCloseCircle } from "react-icons/ai"
import { FiLogOut, FiLogIn } from "react-icons/fi"

import { useDispatch, useSelector } from "react-redux"
import { switchTheme } from "../../redux/actions/sync"
import { LOG_OUT } from "../../redux/actions/types"

import { AiOutlineLogout } from "react-icons/ai"
import { UserAuth } from "../../context/AuthContext"
import style from "./style/google.module.scss"

const NavBar = () => {
    /* const user = null; //{result:{email: "gonza@gmail.com"}} */
    const [userData, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    )
    const { user, logOut } = UserAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useSelector((state) => state.theme.selectedTheme)

    useEffect(() => {
        //const token = userData?.token;
        //JWT
        setUser(JSON.parse(localStorage.getItem("profile")))
    }, [location])
    const [showNavbar, setShowNavbar] = useState(false)

    const handleSelectRoute = () => {
        setShowNavbar(false)
    }

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

    function handleLogout() {
        setUser(null)
        setShowNavbar(false)
        dispatch({ type: LOG_OUT })
        toast.success("Good Bye!", { icon: "👋" })
        navigate("/")
    }

    const NavLink = ({ url, children }) => (
        <Link className="navLink" to={url} onClick={handleSelectRoute}>
            {children}
        </Link>
    )

    return (
        <GlobalContainer theme={theme}>
            <OpenButton
                onClick={() => setShowNavbar(true)}
                isShowing={showNavbar}
            >
                <GiHamburgerMenu id={"HambugerMenu"} />
            </OpenButton>

            <NavBarContainer theme={theme} isShowing={showNavbar}>
                <CloseButton
                    onClick={() => setShowNavbar(false)}
                    isShowing={showNavbar}
                >
                    <AiFillCloseCircle id={"close"} />
                </CloseButton>

                <MainIconContainer theme={theme}>
                    <IoFastFoodSharp />
                    <Title theme={theme}>Food Fast</Title>
                </MainIconContainer>

                {user?.displayName ? (
                    <ButtonsContainer theme={theme}>
                        <img
                            className={style.auth_google_photo}
                            src={user?.photoURL}
                            alt="profile"
                        />
                        <p>{user?.displayName}</p>
                        <p className={style.auth_google_email}>{user?.email}</p>
                        <LoginRegisterButton
                            theme={theme}
                            className={style.auth_google_logout}
                            onClick={handleSignOut}
                        >
                            <AiOutlineLogout />
                            Logout
                        </LoginRegisterButton>
                    </ButtonsContainer>
                ) : (
                    <ButtonsContainer theme={theme}>
                        {userData ? (
                            <ButtonsContainer theme={theme}>
                                <span>{userData?.user?.name} </span>
                                <LoginRegisterButton
                                    onClick={handleLogout}
                                    theme={theme}
                                >
                                    LogOut
                                    <FiLogOut />
                                </LoginRegisterButton>
                            </ButtonsContainer>
                        ) : (
                            <LoginRegisterButton theme={theme}>
                                <NavLink url="/login">
                                    Login
                                    <FiLogIn />
                                </NavLink>
                            </LoginRegisterButton>
                        )}
                    </ButtonsContainer>
                )}
                {/* <ListRoutes> */}
                <hr />
                <h3>CONSUMER</h3>
                <NavLink url="/" onClick={handleSelectRoute}>
                    Home
                </NavLink>

                <NavLink url="/products" onClick={handleSelectRoute}>
                    Products
                </NavLink>

                <h3>CONSUMER</h3>
                <NavLink url="/">Home</NavLink>
                <NavLink url="/products">Products</NavLink>
                <NavLink url="/">My orders</NavLink>
                <NavLink url="/">Oferts</NavLink>
                <NavLink url="/">Contact</NavLink>

                <hr />
                <h3>SELLER</h3>
                {userData?.user?.rol === "ADMIN" ? (
                    <NavLink url="/dashboard" onClick={handleSelectRoute}>
                        {/* <RouteItem onClick={handleSelectRoute}> */}
                        DashBoard
                        {/* </RouteItem> */}
                    </NavLink>
                ) : userData?.user?.rol === "USER" ? (
                    <h5>Debes tener permisos de Administrador!</h5>
                ) : (
                    <h5>Logueate para más funciones! ♥</h5>
                )}

                <h3>SELLER</h3>
                <NavLink url="/dashboard">DashBoard</NavLink>
                <NavLink url="/">Contact</NavLink>

                <button onClick={() => dispatch(switchTheme())}>
                    Switch to {theme.name === "light" ? "dark" : "light"} theme
                </button>
            </NavBarContainer>
        </GlobalContainer>
    )
}

export default NavBar
