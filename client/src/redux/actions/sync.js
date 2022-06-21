import {
    SWITCH_THEME,
    CLEAN_CATEGORIES,
    CLEAN_PRODUCTS,
    DELETE_CATEGORY,
    DELETE_PRODUCT,
    FILTER_BY_CATEGORY,
    SORTBYPRICE,
    CLEAN_SELECT_PRODUCT,
    ADD_ITEM_CAR,
    REMOVE_ITEM_CAR,
    EMPTY_CAR,
    REMOVE_ALL_ITEM_CAR,
    CLEAN_CAR,
    FOCUS_ITEM_CAR
} from "./types"

export const switchTheme = () => ({ type: SWITCH_THEME })

// Categories

export const clean_categories = () => ({ type: CLEAN_CATEGORIES })
export const delete_category = (id) => ({ type: DELETE_CATEGORY, id })
export const filterbyCategories = (categories, price) => ({
    type: FILTER_BY_CATEGORY,
    categories,
    price
})

// Products

export const clean_products = () => ({ type: CLEAN_PRODUCTS })
export const delete_product = (id) => ({ type: DELETE_PRODUCT, id })
export const sortbyPrice = (price) => ({ type: SORTBYPRICE, price })
export const clean_select_product = () => ({ type: CLEAN_SELECT_PRODUCT })

// shopCart
export const add_item_car = (product) => ({type: ADD_ITEM_CAR, payload: product}); 
export const remove_item_car = (product, all=false) => all ? ({type: REMOVE_ALL_ITEM_CAR, payload: product}):({type: REMOVE_ITEM_CAR, payload: product}) 
export const clean_car = () => ({type: CLEAN_CAR})

export const focus_item_car = (id) => ({type: FOCUS_ITEM_CAR, id})