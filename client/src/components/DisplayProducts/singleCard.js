import React, { useEffect, useState } from "react"
import {
    CardContainer,
    TitleDiv,
    ImageContainer,
    FooterContainer,
    NotAvaible
} from "./displayElements"
import { MdReadMore, MdOutlineDoNotDisturb } from "react-icons/md"
import { TbShoppingCartPlus, TbShoppingCartX } from "react-icons/tb"
import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import {
    add_item_car,
    remove_favorite,
    remove_item_car
} from "../../redux/actions/sync"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import axios from "axios"

export default function SingleProductCard({ product, list }) {
    const [isAdded, setIsAdded] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const user = useSelector((state) => state.user.authData)

    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)
    const products = useSelector((state) => state.shopCart.shopCart)

    const addItem = async (e) => {
        e.preventDefault()
        const item = { ...product, img: {} }
        if (user) {
            await axios.post(
                `${process.env.REACT_APP_BACK_URL}/api/v1/user/shopCart/add/${user.user._id}`,
                { product: item }
            )
        }
        dispatch(add_item_car(item))
        setIsAdded(true)
    }
    const removeItem = async (e) => {
        e.preventDefault()
        const item = { ...product, img: {} }
        if (user) {
            await axios.post(
                `${process.env.REACT_APP_BACK_URL}/api/v1/user/shopCart/removeSame/${user.user._id}`,
                {
                    product: item
                }
            )
        }
        dispatch(remove_item_car(item, true))
        setIsAdded(false)
    }

    const handleAddFavorite = async (e) => {
        e.preventDefault()
        await axios.post(
            `${process.env.REACT_APP_BACK_URL}/api/v1/favorites/${user.user._id}`,
            {
                idProduct: product._id
            }
        )
        setIsFavorite(true)
    }

    const handleRemoveFavorite = async (id) => {
        await axios.post(
            `${process.env.REACT_APP_BACK_URL}/api/v1/favorites/${user.user._id}`,
            {
                idProduct: product._id
            }
        )
        dispatch(remove_favorite(id))
        setIsFavorite(false)
    }

    useEffect(() => {
        let coincidence = products.find((el) => el._id === product._id)
        if (coincidence) setIsAdded(true)
        let isFavorite = list && list.find((el) => el === product._id)
        if (isFavorite) setIsFavorite(true)
    }, [list])
    return (
        <CardContainer theme={theme}>
            <TitleDiv>{product.name}</TitleDiv>
            <ImageContainer
                to={`/products/${product._id}`}
                img={product.image && product.image.secure_url}
            />
            {product.stock === 0 && <NotAvaible>No disponible</NotAvaible>}
            <FooterContainer theme={theme}>
                ${product.price}
                {product.stock !== 0 && (
                    <div>
                        {!isAdded ? (
                            <TbShoppingCartPlus id="car" onClick={addItem} />
                        ) : (
                            <TbShoppingCartX id="car" onClick={removeItem} />
                        )}
                    </div>
                )}
                <Link to={`/products/${product._id}`} id="details">
                    <MdReadMore />
                </Link>
                {user && (
                    <div>
                        {!isFavorite ? (
                            <AiOutlineHeart onClick={handleAddFavorite} />
                        ) : (
                            <AiFillHeart
                                onClick={() =>
                                    handleRemoveFavorite(product._id)
                                }
                            />
                        )}
                    </div>
                )}
            </FooterContainer>
        </CardContainer>
    )
}
