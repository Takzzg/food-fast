import React, { useEffect, useState } from "react"
import {
    DescriptionContainer,
    GlobalContainer,
    ImageContainer,
    MainContainer,
    TitleContainer,
    ListItem,
    Etiqueta,
    Data,
    CarShop,
    BuyButton,
    ButtonsContainer,
    SecondMainContainer
} from "./detailElements"

import { AiOutlineShoppingCart } from "react-icons/ai"
import { AiOutlineCreditCard } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { baseUrl, findProductById } from "../../../redux/actions/async"
import {
    add_item_car,
    clean_select_product,
    remove_item_car
} from "../../../redux/actions/sync"
import Reviews from "../../Reviews/ProductReviews"

const DetailProduct = () => {
    const { idProduct } = useParams()
    const dispatch = useDispatch()
    const product = useSelector((state) => state.main.products.selected)

    const [isAdded, setIsAdded] = useState(false)
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

    useEffect(() => {
        idProduct && dispatch(findProductById(idProduct))
    }, [dispatch, idProduct])

    useEffect(() => {
        return () => dispatch(clean_select_product())
    }, [dispatch])

    if (!product || !product.name) return <h1>Loading...</h1>

    return (
        <GlobalContainer>
            <TitleContainer>{product.name}</TitleContainer>
            <MainContainer>
                <ImageContainer>
                    <img
                        src={`${baseUrl}/products/img/${idProduct}`}
                        alt="Foto del producto"
                    />
                </ImageContainer>

                <SecondMainContainer>
                    <DescriptionContainer>
                        <ListItem>
                            <Etiqueta>DESCRIPTION:</Etiqueta>
                            <Data>{product.description}</Data>
                        </ListItem>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center"
                            }}
                        >
                            <ListItem>
                                <Etiqueta>Stock</Etiqueta>
                                <Data>{product.stock}</Data>
                            </ListItem>

                            <ListItem>
                                <Etiqueta>Price</Etiqueta>
                                <Data>{`$/ ${product.price}`}</Data>
                            </ListItem>
                        </div>
                        <ListItem>
                            <Etiqueta>Categories:</Etiqueta>
                            <Data>{product.categories.join(", ")}</Data>
                        </ListItem>
                    </DescriptionContainer>

                    <ButtonsContainer>
                        {!isAdded ? (
                            <CarShop onClick={addItem}>
                                <AiOutlineShoppingCart id="car" />
                            </CarShop>
                        ) : (
                            <CarShop onClick={removeItem}>
                                <AiOutlineShoppingCart
                                    id="car"
                                    style={{ color: "red" }}
                                />
                            </CarShop>
                        )}
                        <BuyButton>
                            <AiOutlineCreditCard />
                        </BuyButton>
                    </ButtonsContainer>
                </SecondMainContainer>
            </MainContainer>
            <MainContainer>
                <Reviews />
            </MainContainer>
        </GlobalContainer>
    )
}

export default DetailProduct
