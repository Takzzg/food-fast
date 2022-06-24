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
import {AiFillStar} from "react-icons/ai"
import axios from "axios"

export default function SingleProductCard({ product }) {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); 
    const user = useSelector(state=> state.user.authData)

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

    const handleAddFavorite = async (e) => {
        e.preventDefault(); 
        await axios.post(`http://localhost:3001/api/v1/favorites/${user.user._id}`, {
            idProduct: product._id
        })
        setIsFavorite(!isFavorite)
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

            <FooterContainer theme={theme}>
                ${product.price}
                {!isAdded ? (
                    <TbShoppingCartPlus id="car" onClick={addItem}/>
                ) : (
                    <TbShoppingCartX id="car" onClick={removeItem} />
                )}
                <Link to={`/products/${product._id}`} id="details">
                    <MdReadMore />
                </Link>
                {user && 
                    <AiFillStar id={isFavorite ? "Favorite":"noFavorite"} onClick={handleAddFavorite} /> 
                }
            </FooterContainer>
        </CardContainer>
    )
}
