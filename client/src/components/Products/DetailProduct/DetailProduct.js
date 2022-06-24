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
    SecondMainContainer,
    ProductHeader
} from "./detailElements"

import { AiOutlineShoppingCart } from "react-icons/ai"
import { AiOutlineCreditCard } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    baseUrl,
    findProductById,
    getProductReviews,
    postReview
} from "../../../redux/actions/async"
import {
    add_item_car,
    clean_select_product,
    remove_item_car
} from "../../../redux/actions/sync"
import ReviewCard from "../../Reviews/ReviewCard"

const initialState = {
    title: "",
    comment: "",
    score: ""
}

const DetailProduct = () => {
    const { idProduct } = useParams()
    const dispatch = useDispatch()
    const product = useSelector((state) => state.main.products.selected)
    const [reviews, setReviews] = useState([])
    const [reviewForm, setReviewForm] = useState(initialState)
    const [scoreAvg, setScoreAvg] = useState(0)
    const [isAdded, setIsAdded] = useState(false)
    const products = useSelector((state) => state.shopCart.shopCart)
    const userId = useSelector((state) => state.user.authData.user._id)

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
        let average = reviews.length
            ? reviews.reduce((total, next) => total + next.score, 0) /
              reviews.length
            : 0
        setScoreAvg(average.toFixed(2))
    }, [setScoreAvg, reviews])

    useEffect(() => {
        let coincidence = products.find((el) => el._id === product._id)
        if (coincidence) setIsAdded(true)
    }, [])

    useEffect(() => {
        idProduct && dispatch(findProductById(idProduct))
        getProductReviews(idProduct).then((reviews) => setReviews(reviews))
    }, [dispatch, idProduct])

    useEffect(() => {
        return () => dispatch(clean_select_product())
    }, [dispatch])

    const fetchReviews = () => {
        getProductReviews(idProduct).then((reviews) => setReviews(reviews))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newReview = {
            ...reviewForm,
            date: new Date(),
            userId,
            productId: idProduct
        }
        postReview(newReview).then(() => fetchReviews())
    }

    const handleFormChange = (e) => {
        setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
    }

    if (!product || !product.name) return <h1>Loading...</h1>

    return (
        <GlobalContainer>
            <ProductHeader>
                <TitleContainer>{product.name}</TitleContainer>
                <div className="score">{scoreAvg}/5</div>
            </ProductHeader>
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
                <div>
                    <span className="title">Reviews</span>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Titulo</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={reviewForm.title}
                            onChange={handleFormChange}
                        />
                        <label htmlFor="comment">Comentario</label>
                        <input
                            type="text"
                            name="comment"
                            id="comment"
                            value={reviewForm.comment}
                            onChange={handleFormChange}
                        />
                        <label htmlFor="score">Puntaje</label>
                        {[1, 2, 3, 4, 5].map((v) => (
                            <input
                                key={v}
                                type="radio"
                                name="score"
                                value={v}
                                id={v}
                                onClick={handleFormChange}
                            />
                        ))}
                        <input type="submit" value="Enviar" />
                    </form>
                    {reviews.length &&
                        reviews.map((r) => (
                            <ReviewCard key={r._id} review={r} />
                        ))}
                </div>
            </MainContainer>
        </GlobalContainer>
    )
}

export default DetailProduct
