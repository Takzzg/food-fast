import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { Link } from "react-router-dom"

import {
    GlobalContainer,
    MainIconContainer,
    NavBarContainer,
    LoginRegisterButton,
    Title,
    ButtonsContainer,
    OpenButton,
    CloseButton
    // Divider
} from "./NavBar.styled"
import { UserContainer } from "../filterBar/filterElements"
import { IoFastFoodSharp } from "react-icons/io5"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiFillCloseCircle, AiOutlineLogout } from "react-icons/ai"
import { FiLogOut, FiLogIn } from "react-icons/fi"
import { MdDarkMode, MdLightMode } from "react-icons/md"
import { FaUserAlt, FaShoppingCart } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { switchTheme } from "../../redux/actions/sync"
import { LOG_OUT } from "../../redux/actions/types"

import { UserAuth } from "../../context/AuthContext"
import style from "./style/google.module.scss"

const NavBar = () => {
    const [userData, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    )
    const { user, logOut } = UserAuth()
    const logedUser = useSelector((state)=> state.user.authData && state.user.authData.user)
    const reduxUser = useSelector((state) => state.user.authData?.user)
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
            handleLogout()
        } catch (error) {
            console.log(error)
        }
    }

    function handleLogout() {
        setUser(null)
        setShowNavbar(false)
        dispatch({ type: LOG_OUT })
        toast.success("Good Bye!", { icon: "👋" })
        navigate("/login")
    }

    const NavLink = ({ url, children }) => (
        <Link className="navLink" to={url} onClick={handleSelectRoute}>
            {children}
        </Link>
    )

    return (
        <GlobalContainer theme={theme}>
            <Toaster />
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
                    <Title theme={theme}>Food's Universe</Title>
                </MainIconContainer>

                {user?.displayName ? (
                    <ButtonsContainer theme={theme}>
                        <img
                            className={style.auth_google_photo}
                            src={userData?.user?.photo || user?.photoURL}
                            alt="profile"
                            referrerPolicy="no-referrer"
                        />
                        <span>{user?.displayName}</span>
                        {/* <span className={style.auth_google_email}>{user?.email}</span> */}
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
                                    <span>LogOut</span>
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
                
                <hr />
                <div id={style.navButtons}>
                    <button id={style.switchTheme}
                    onClick={() => dispatch(switchTheme())}>
                        {theme.name === "light" ? <MdDarkMode/> : <MdLightMode/>}
                    </button>
                    <button id={style.cartBtn}>
                        <Link to="/user/shoppingCart" >
                            <FaShoppingCart />
                        </Link>
                    </button>
                    <button id={style.profileBtn} theme={theme}>
                        <Link to={!logedUser ? "/login":"/commonUser/profile"}>  
                            <FaUserAlt />
                        </Link>
                    </button>
                </div>
                <hr />

                <h3>CONSUMIDOR</h3>
                <NavLink url="/">Home</NavLink>
                <NavLink url="/products">Productos</NavLink>
                {reduxUser?.rol && (
                    <>
                        <NavLink url={`/commonUser/${reduxUser._id}/orders`}>Mis Órdenes</NavLink>
                        <NavLink url={`/user/${reduxUser._id}/reviews`}>
                            Mis reseñas
                        </NavLink>
                    </>
                )}
                {/* <NavLink url="/">Ofertas</NavLink> */}
               

                <hr />
                {reduxUser?.rol === "ADMIN" && (
                    <>
                        <h3>VENDEDOR</h3>
                        <NavLink url="/dashboard" onClick={handleSelectRoute}>
                            DashBoard
                        </NavLink>
                    </>
                )}

            
                {/* <div> */}


            </NavBarContainer>
        </GlobalContainer>
    )
}

export default NavBar
