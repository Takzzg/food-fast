import axios from "axios"
import { clean_categories, clean_products } from "./sync"

import {
    ERROR,
    FETCH_CATEGORIES,
    FETCH_PRODUCTS,
    FILTER_PRODUCTS,
    SEARCH_PRODUCT,
    FIND_PRODUCT_BY_ID,
    SEARCH_CATEGORY,
    NEWFILTER_PRODUCTS,
    FIND_CAT_BY_ID,
    AUTH_USER,
    AUTH_ERROR,
    GOOGLE_LOGIN
} from "./types"

export const baseUrl = `${
    process.env.NODE_ENV === "production"
        ? "https://food-fast-api.herokuapp.com"
        : "http://localhost:3001"
}/api/v1`

const fetch = (url, type) => (dispatch) =>
    axios
        .get(url)
        .then((res) => dispatch({ type: type, payload: res.data }))
        .catch((err) => {
            console.log(`error en ${type} \n url = ${url} \n mensaje = ${err}`)
            dispatch({ type: ERROR, payload: err })
        })

// PRODUCTS

export const fetchAllProducts = () =>
    fetch(`${baseUrl}/products`, FETCH_PRODUCTS)

export const fetchProductsByCat = (cat) =>
    fetch(`${baseUrl}/categories/category?name=${cat}`, FILTER_PRODUCTS)

export const searchProductAsync = (name) =>
    name
        ? fetch(`${baseUrl}/products?name=${name}`, "SEARCH_PRODUCT_ASYNC")
        : clean_products()

export const findProductById = (id) =>
    fetch(`${baseUrl}/products/${id}`, FIND_PRODUCT_BY_ID)

export const newFilterProduct = (filterOrder, sortOrder) =>
    fetch(
        `${baseUrl}/products?filterOrder=${filterOrder}&sortOrder=${sortOrder}`,
        NEWFILTER_PRODUCTS
    )

export const postProduct = (product) => (dispatch) =>
    axios
        .post(`${baseUrl}/products`, product)
        .then(() => dispatch(fetchAllProducts()))
        .catch((err) => dispatch({ type: ERROR, payload: err }))

// CATEGORIES

export const findCatById = (id) =>
    fetch(`${baseUrl}/categories/${id}`, FIND_CAT_BY_ID)

export const fetchAllCategories = () =>
    fetch(`${baseUrl}/categories`, FETCH_CATEGORIES)

export const searchCategory = (name) =>
    name
        ? fetch(`${baseUrl}/categories/category?name=${name}`, SEARCH_CATEGORY)
        : clean_categories()

export const postCategory = (category) => (dispatch) =>
    axios
        .post(`${baseUrl}/categories`, category)
        .then(() => dispatch(fetchAllCategories()))
        .catch((err) => dispatch({ type: ERROR, payload: err }))

export const deleteCategory = (id) => (dispatch) =>
    axios
        .delete(`${baseUrl}/categories/${id}`)
        .then(() => dispatch(fetchAllCategories()))
        .catch((err) => dispatch({ type: ERROR, payload: err }))

// USER

export const googleLogin = (userData) => (dispatch) => {
    try {
        dispatch({ type: GOOGLE_LOGIN, payload: userData })
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: { error: e } })
        console.log("Error en la google login. ", e.message)
    }
}

export const login = (input) => async (dispatch) => {
    try {
        //log in the user...
        const data = await axios.post(`${baseUrl}/auth/login`, input)

        dispatch({ type: AUTH_USER, payload: data?.data })
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: { error: e } })
        console.log("Error en la action login. ", e.message)
    }
}
export const logup = (input) => async (dispatch) => {
    try {
        //log up the user...

        await axios.post(`${baseUrl}/user`, input)

        dispatch({ type: AUTH_USER, payload: { success: true } })
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: { error: e } })
        console.log("Error en la action logup. ", e)
    }
}

export const postForgotPassword = async (email) => {
    try {
        await axios.post(`${baseUrl}/auth/forgot-password`, { email })
    } catch (e) {
        console.log("Error en el postForgotPassword. ", e.message)
        return { error: e.message }
    }
}

export const postNewPassword = async (payload) => {
    try {
        await axios.post(
            `${baseUrl}/auth/reset-password/${payload.id}/${payload.token}`,
            payload
        )
    } catch (e) {
        console.log("Error en el postNewPassword. ", e)
    }
}

// REVIEWS

export const postReview = (review) =>
    axios.post(`${baseUrl}/reviews`, review).then((res) => res.data)

export const getProductReviews = (id) =>
    axios.get(`${baseUrl}/reviews/product/${id}`).then((res) => res.data)

export const getUserReviews = (id) =>
    axios.get(`${baseUrl}/reviews/user/${id}`).then((res) => res.data)

export const deleteReview = (id) =>
    axios.delete(`${baseUrl}/reviews/${id}`).then((res) => res.data)
