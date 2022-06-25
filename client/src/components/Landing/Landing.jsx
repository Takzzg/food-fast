import React from "react"
import { useDispatch, useSelector } from "react-redux"
import CategoryBar from "./UbicationBar/UbicationBar"
import { CategoriesContainer, GlobalContainer } from "./landingElements"
import CategoryCard from "../Categories/CategorysLanding"
import { useEffect } from "react"
import { AiOutlineWhatsApp } from "react-icons/ai"
import { SiGooglemaps } from "react-icons/si";
import { SiTelegram } from "react-icons/si";
import logo from "./img/tlg1.jpg"
import style from "./styles/footer.module.scss"

import {
    fetchAllCategories, googleLogin
    // searchCategory,
    // searchProduct
} from "../../redux/actions/async"
import { useLocation } from "react-router-dom"
import { UserAuth } from "../../context/AuthContext"
import styled from "styled-components"

const Landing = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const {user} = UserAuth()
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
        if(user?.accessToken){

            dispatch(googleLogin({
                token: {
                  token: user.accessToken
                },
                user: {
                  name: user.displayName,
                  email: user.email,
                  photo: user.photoURL,
                  uid: user.uid
                }
              }))
        }
    },[])

    return (
        <GlobalContainer
            bgImg={
                "https://www.minervafoods.com/wp-content/uploads/2017/02/como_fazer_hamburguer_caseiro_0.jpg"
            }
        >
            <div className="ornament" />
            <h1 className="welcome">Everything you want in one place</h1>

            <CategoryBar className="LocationBar" />
            <CategoriesContainer>
                {filterCategories.map((c, i) => (
                    <CategoryCard
                        key={c._id}
                        category={c}
                        color={() => getColor(i)}
                        url={`/categories/${c._id}`}
                    />
                ))}
                
            </CategoriesContainer>
            <footer className={style.footer_contact}>
            <div className={style.footer_box}> 
                <div className={style.footer_title}>
                    FoodFast Inc.
                </div>
                <div className={style.footer_wsp}>
                <AiOutlineWhatsApp/>
                WhatsApp : (+54) 3512999683
                </div>
              <div className={style.footer_ubicacion}>
              <SiGooglemaps/>
              Jose Moretto 3776-3778, Córdoba, Argentina
              </div>
              <div className={style.footer_tlg}>
              <SiTelegram/>
              foodfast_app_bot
              </div>
              </div>
              <div className={style.tlg_button}>
                <buttom className={style.telegram_button}>
                    <img className={style.footer_img} src={logo}/>
                <a  href="https://msng.link/o/?@foodfast_app_bot=tg" target="_blank">Telegram</a> 
                    </buttom>
                </div>

            </footer>
            
        </GlobalContainer>
        
    )
}

export default Landing
