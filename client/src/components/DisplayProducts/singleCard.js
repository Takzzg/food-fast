import React, { useEffect, useState } from "react"
import {
    CardContainer,
    TitleDiv,
    ImageContainer,
    FooterContainer
} from "./displayElements"
import { MdReadMore } from "react-icons/md"
import { TbShoppingCartPlus, TbShoppingCartX } from "react-icons/tb"
import { Link } from "react-router-dom"
import { baseUrl } from "../../redux/actions/async"
import { useDispatch, useSelector } from "react-redux"
import { add_item_car, remove_item_car } from "../../redux/actions/sync"
// import { useLocalStorage } from "../CustomHooks/useLocalStorage"

export default function SingleProductCard({ product }) {
    const [isAdded, setIsAdded] = useState(false)

    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)
    const products = useSelector((state) => state.shopCart.shopCart)
    const addItem = (e) => {
        e.preventDefault()
        const item = { ...product, img: {} }
        dispatch(add_item_car(item))
        setIsAdded(true)
    }
    const removeItem = (e) => {
        e.preventDefault()
        const item = { ...product, img: {} }
        dispatch(remove_item_car(item, true))
        setIsAdded(false)
    }
    useEffect(() => {
        let coincidence = products.find((el) => el._id === product._id)
        if (coincidence) setIsAdded(true)
    }, [])
    return (
        <CardContainer theme={theme}>
            <TitleDiv>{product.name}</TitleDiv>

            <ImageContainer
                to={`/products/${product._id}`}
                img={`${baseUrl}/products/img/${product._id}`}
            />
            {/* <Link to={`/products/${product._id}`}>
                    <img
                        src={`${baseUrl}/products/img/${product._id}`}
                        alt="imagen"
                    />
                </Link> */}
            {/* </ImageContainer> */}

            <FooterContainer theme={theme}>
                ${product.price}
                {!isAdded ? (
                    <TbShoppingCartPlus id="car" onClick={addItem} />
                ) : (
                    <TbShoppingCartX id="car" onClick={removeItem} />
                )}
                <Link to={`/products/${product._id}`} id="details">
                    <MdReadMore />
                </Link>
            </FooterContainer>
        </CardContainer>
    )
}
