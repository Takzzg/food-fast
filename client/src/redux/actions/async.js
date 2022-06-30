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
    GOOGLE_LOGIN,
    FETCH_USERS,
    ROL_CHANGE,
    GET_FAVORITES,
    GET_USER_ORDERS,
    GET_ORDER_BY_ID,
    ADD_USER_ITEMS,
    GET_ALL_ORDERS,
    GET_USER_INFORMATION
} from "./types"

// export const baseUrl = `${
//     process.env.NODE_ENV === "production"
//         ? "https://food-fast-api.herokuapp.com"
//         : "http://localhost:3001"
// }/api/v1`

export const baseUrl = `${process.env.REACT_APP_BACK_URL}/api/v1`

const fetch = (url, type) => (dispatch) => {
    axios
        .get(baseUrl + url)
        .then((res) => dispatch({ type: type, payload: res.data }))
        .catch((err) => {
            console.log(
                `error en ${type} \n url = ${baseUrl + url} \n mensaje = ${err}`
            )
            dispatch({ type: ERROR, payload: err })
        })
}

// PRODUCTS

export const fetchAllProducts = () => fetch(`/products`, FETCH_PRODUCTS)

export const fetchProductsByCat = (cat) =>
    fetch(`/categories/category?name=${cat}`, FILTER_PRODUCTS)

export const searchProductAsync = (name) =>
    name
        ? fetch(`/products?name=${name}`, "SEARCH_PRODUCT_ASYNC")
        : clean_products()

export const findProductById = (id) =>
    fetch(`/products/${id}`, FIND_PRODUCT_BY_ID)

export const newFilterProduct = (filterOrder, sortOrder) =>
    fetch(
        `/products?filterOrder=${filterOrder}&sortOrder=${sortOrder}`,
        NEWFILTER_PRODUCTS
    )

export const postProduct = (product) => (dispatch) =>
    axios
        .post(`${baseUrl}/products`, product)
        .then(() => dispatch(fetchAllProducts()))
        .catch((err) => dispatch({ type: ERROR, payload: err }))

// CATEGORIES

export const findCatById = (id) => fetch(`/categories/${id}`, FIND_CAT_BY_ID)

export const fetchAllCategories = () => fetch(`/categories`, FETCH_CATEGORIES)

export const searchCategory = (name) =>
    name
        ? fetch(`/categories/category?name=${name}`, SEARCH_CATEGORY)
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
        console.log("googleLogin!")
        axios
            .get(`${baseUrl}/user/?email=${userData.user.email}`)
            .then((res) => {
                let combinedUser = { ...userData }
                combinedUser.user = { ...res.data[0], ...userData.user }
                dispatch({ type: GOOGLE_LOGIN, payload: combinedUser })
            })
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
        throw new Error("Inexistent email.")
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

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const result = await axios.get(`${baseUrl}/user`)
        const users = result?.data
        dispatch({ type: FETCH_USERS, payload: users })
    } catch (e) {
        console.log("Error en fetchAllUsers. ", e)
    }
}

export const changePermissions = (id, rol) => async (dispatch) => {
    try {
        const result = await axios.patch(`${baseUrl}/user/${id}`, { rol })
        //result me devuelve el archivo a editar ANTES del cambio
        const data = result.data
        dispatch({ type: ROL_CHANGE, payload: { id: id, rol: rol } })
    } catch (e) {
        console.log("Error en changePermissions. ", e)
    }
}

// Favorites

export const getFavorites = (productID) => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/products/${productID}`)
        dispatch({ type: GET_FAVORITES, payload: response.data })
    } catch (e) {
        const defaultReponse = {
            id: "12123123",
            name: "Product not found",
            description: "deleted product"
        }
        dispatch({ type: GET_FAVORITES, payload: defaultReponse })
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

// ORDERS
export const getAllOrder = () => async (dispatch) => {
    const response = await axios.get(`${baseUrl}/orders`)
    dispatch({ type: GET_ALL_ORDERS, payload: response.data })
}
export const getUserOrders = (userID) => async (dispatch) => {
    const response = await axios.get(`${baseUrl}/orders/user/${userID}`)
    dispatch({ type: GET_USER_ORDERS, payload: response.data })
}

export const getUserOrderbyID =
    (orderID, getUserInformation) => async (dispatch) => {
        const response = await axios.get(`${baseUrl}/orders/${orderID}`)
        let response2 = {}
        if (getUserInformation) {
            const userID = response.data.user
            response2 = await axios.get(`${baseUrl}/user/${userID}`)
        }
        dispatch({
            type: GET_ORDER_BY_ID,
            payload: [response.data, response2.data]
        })
    }

export const getUserInformation = (userID) => async (dispatch) => {
    const response = await axios.get(`${baseUrl}/user/${userID}`)
    dispatch({ type: GET_USER_INFORMATION, payload: response.data })
}
// Get items shopcart user
export const getShopCartUser = (userID, products) => async (dispatch) => {
    const savePrev = await axios.post(
        `${baseUrl}/user/shopCart/addPrevItem/${userID}`,
        {
            products: products
        }
    )
    const response = await axios.get(`${baseUrl}/user/${userID}`)
    dispatch({ type: ADD_USER_ITEMS, payload: response.data.shopCart })
}
