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
    ProductHeader,
    ReviewsContainer,
    NotAvailable
} from "./detailElements"
import { Link } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { AiOutlineCreditCard } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    baseUrl,
    deleteReview,
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
import { BsStar, BsStarFill } from "react-icons/bs"
import axios from "axios"
import Loading from "../../Loading/Loading"

const initialState = {
    title: "",
    comment: "",
    score: ""
}

const DetailProduct = () => {
    const { idProduct } = useParams()
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)
    const product = useSelector((state) => state.main.products.selected)
    const [reviews, setReviews] = useState([])
    const [reviewForm, setReviewForm] = useState(initialState)
    const [scoreAvg, setScoreAvg] = useState(0)
    const [isAdded, setIsAdded] = useState(false)
    const products = useSelector((state) => state.shopCart.shopCart)
    const userId = useSelector((state) => state.user.authData?.user._id)
    const user = useSelector((state) => state.user.authData)

    const addItem = async (e) => {
        e.preventDefault()
        const item = { ...product }
        if (userId) {
            await axios.post(
                `${process.env.REACT_APP_BACK_URL}/api/v1/user/shopCart/add/${userId}`,
                { product: item }
            )
        }
        dispatch(add_item_car(item))
        setIsAdded(true)
    }
    const removeItem = async (e) => {
        e.preventDefault()
        const item = { ...product }
        if (userId) {
            await axios.post(
                `${process.env.REACT_APP_BACK_URL}/api/v1/user/shopCart/removeSame/${userId}`,
                {
                    product: item
                }
            )
        }
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
        // getProductReviews(idProduct).then((reviews) => setReviews(reviews))
        getProductReviews(idProduct).then((reviews) => {
            console.log(reviews)
            return setReviews(reviews)
        })
    }

    const handleDeleteReview = (id) => {
        deleteReview(id).then(() => fetchReviews())
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
        setReviewForm(initialState)
    }

    const handleFormChange = (e) => {
        setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
    }

    const setFormScore = (v) => {
        setReviewForm({ ...reviewForm, score: v })
    }

    if (!product || !product.name) return <Loading>Loading...</Loading>

    console.log(reviews)

    return (
        <GlobalContainer theme={theme}>
            <ProductHeader theme={theme}>
                <TitleContainer>{product.name}</TitleContainer>
                <div className="score">
                    <BsStarFill /> {scoreAvg}/5
                </div>
            </ProductHeader>
            <MainContainer>
                <ImageContainer>
                    <img
                        src={product.image && product.image.secure_url}
                        alt="Foto del producto"
                    />
                </ImageContainer>

                <SecondMainContainer>
                    {product.stock === 0 && (
                        <NotAvailable>Producto No disponible</NotAvailable>
                    )}

                    <DescriptionContainer theme={theme}>
                        <ListItem>
                            <Etiqueta>DESCRIPCIÓN:</Etiqueta>
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
                                <Etiqueta>Precio</Etiqueta>
                                <Data>{`$/ ${product.price}`}</Data>
                            </ListItem>
                        </div>
                        <ListItem>
                            <Etiqueta>Categories:</Etiqueta>
                            <Data>{product.categories.join(", ")}</Data>
                        </ListItem>
                    </DescriptionContainer>
                    {product.stock !== 0 && (
                        <ButtonsContainer theme={theme}>
                            {!isAdded ? (
                                <CarShop theme={theme} onClick={addItem}>
                                    <AiOutlineShoppingCart id="car" />
                                </CarShop>
                            ) : (
                                <CarShop
                                    theme={theme}
                                    onClick={removeItem}
                                    disabled={product.stock === 0}
                                >
                                    <AiOutlineShoppingCart
                                        id="car"
                                        style={{ color: "red" }}
                                    />
                                </CarShop>
                            )}

                            <BuyButton theme={theme} to="/user/shoppingCart">
                                <AiOutlineCreditCard />
                            </BuyButton>
                        </ButtonsContainer>
                    )}
                </SecondMainContainer>
            </MainContainer>
            <hr/>
                <span className="reviewsTitle">Reseñas y Puntaje</span>
            <ReviewsContainer theme={theme}>
                {userId ?
                    <form onSubmit={handleSubmit}>
                    <span className="formTitle">Deja tu comentario</span>
                    <label htmlFor="title">Titulo</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={reviewForm.title}
                        onChange={handleFormChange}
                    />
                    <label htmlFor="comment">Comentario</label>
                    <textarea
                        name="comment"
                        id="comment"
                        value={reviewForm.comment}
                        onChange={handleFormChange}
                    />

                    <label htmlFor="score">Puntaje</label>
                    <div className="radioCont">
                        {[1, 2, 3, 4, 5].map((v) => (
                            <div
                                className="scoreBtn"
                                id={v}
                                key={v}
                                onClick={() => setFormScore(v)}
                            >
                                {reviewForm.score >= v ? (
                                    <BsStarFill />
                                ) : (
                                    <BsStar />
                                )}
                            </div>
                        ))}
                    </div>
                    <input className="submit" type="submit" value="Enviar" />
                </form> : (
                        <div id="noForm">
                            <p>Loguéate para puntuar y comentar! ♥</p>
                        </div>
                        )}
                <div className="reviews">
                    {reviews.length ? (
                        reviews.map((r) => (
                            <ReviewCard
                                key={r._id}
                                review={r}
                                handleDelete={handleDeleteReview}
                            />
                        ))
                    ) : (
                        <div id="noForm">
                            <p>Este producto aún no tiene reviews... Sé el primero! 🥇</p>
                        </div>
                    )}
                </div>
            </ReviewsContainer>
        </GlobalContainer>
    )
}

export default DetailProduct
