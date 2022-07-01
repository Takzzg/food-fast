import React from "react"
import { useDispatch, useSelector } from "react-redux"
import CategoryBar from "./UbicationBar/UbicationBar"
import { CategoriesContainer, GlobalContainer } from "./landingElements"
import CategoryCard from "../Categories/CategorysLanding"
import { useEffect } from "react"
import { AiOutlineWhatsApp } from "react-icons/ai"
import { SiGooglemaps } from "react-icons/si"
import { SiTelegram } from "react-icons/si"
import logo from "./img/tlg1.jpg"
import style from "./styles/footer.module.scss"

import {
    fetchAllCategories,
    googleLogin
    // searchCategory,
    // searchProduct
} from "../../redux/actions/async"
import { useLocation } from "react-router-dom"
import { UserAuth } from "../../context/AuthContext"
import Loading from "../Loading/Loading"

const Landing = () => {
    const dispatch = useDispatch()
    const { user } = UserAuth()
    const theme = useSelector((state) => state.theme.selectedTheme)
    const allCategories = useSelector((state) => state.main.categories.all)
    const filterCategories = useSelector(
        (state) => state.main.categories.filtered
    )

    const getColor = (i) =>
        `hsl(${(255 / filterCategories.length) * i}, 100%, 33%)`

    useEffect(() => {
        !allCategories.length && dispatch(fetchAllCategories())
    }, [dispatch])

    useEffect(() => {
        if (user?.accessToken && !window.localStorage.getItem('profile')) {
            
            dispatch(
                googleLogin({
                    token: {
                        token: user.accessToken
                    },
                    user: {
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                        uid: user.uid
                    }
                })
            )
        }
    }, [])

    return (
        <GlobalContainer
            bgImg={
                "https://www.minervafoods.com/wp-content/uploads/2017/02/como_fazer_hamburguer_caseiro_0.jpg"
            }
        >
            <div className="ornament" />
            <h1 className="welcome">Todo lo que necesitas, en un sólo lugar</h1>

            <CategoryBar className="LocationBar" />
            <CategoriesContainer>
                {allCategories.length === 0 && <Loading
                        text={"Buscando categorias"}
                        // color={theme.colors.main}
                        bg={theme.colors.main}
                    />}

                {filterCategories.length === 0 && allCategories.length > 0 ? (
                        <div>No se encontraron resultados</div>      
                ) : (
                    filterCategories.map((c, i) => (
                        <CategoryCard
                            key={c._id}
                            category={c}
                            color={() => getColor(i)}
                            url={`/categories/${c._id}`}
                        />
                    ))
                )}
            </CategoriesContainer>
            <footer className={style.footer_contact}>
                <div className={style.footer_box}>
                    <div className={style.footer_title}>FoodFast Inc.</div>
                    <div className={style.footer_wsp}>
                        <AiOutlineWhatsApp />
                        WhatsApp : (+54) 3512999683
                    </div>
                    <div className={style.footer_ubicacion}>
                        <SiGooglemaps />
                        Jose Moretto 3776-3778, Córdoba, Argentina
                    </div>
                    <div className={style.footer_tlg}>
                        <SiTelegram />
                        foodfast_app_bot
                    </div>
                </div>
                <div className={style.tlg_button}>
                    <button className={style.telegram_button}>
                        <img className={style.footer_img} src={logo} alt="" />
                        <a
                            href="https://t.me/foodfast_app_bot"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Telegram
                        </a>
                    </button>
                </div>
            </footer>
        </GlobalContainer>
    )
}

export default Landing
