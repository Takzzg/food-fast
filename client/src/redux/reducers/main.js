import {
    CLEAN_CATEGORIES,
    CLEAN_PRODUCTS,
    CLEAN_SELECT_PRODUCT,
    DELETE_CATEGORY,
    DELETE_PRODUCT,
    ERROR,
    FETCH_CATEGORIES,
    FETCH_PRODUCTS,
    FILTER_BY_CATEGORY,
    FILTER_PRODUCTS,
    FIND_CAT_BY_ID,
    FIND_PRODUCT_BY_ID,
    GET_FAVORITES,
    REMOVE_FAVORITE,
    SEARCH_CATEGORY,
    SEARCH_PRODUCT,
    SORTBYPRICE
} from "../actions/types"

function filterProduct(products, categories, rating, stock, price) {
    let returnValue
    if (categories) {
        returnValue = products.filter(
            (el) => {
                let arrayCategories = el.categories; 
                if (arrayCategories) {
                    let counter = 0
                    for (let i = 0; i < categories.length; i++) {
                        for (let j = 0; j < arrayCategories.length; j++) {
                            if (arrayCategories[j] === categories[i]) {
                                counter++
                            }
                        }
                    }
                    if (counter === categories.length) return true
                    else return false
                }
                return false})}    
    if (rating) {
        returnValue = returnValue.filter(el=> el.rating === rating); 
    }
    if (stock) {
        returnValue = returnValue.filter((a,b)=> Number(a.stock) - Number(b.stock) )
    }
    if (price) {
        returnValue = returnValue.filter((a,b)=> Number(a.price) - Number(b.price))
    }
    return returnValue; 
}

function compareProducts(a, b, form) {
    if (form === "1") {
        return a.price - b.price
    } else {
        return b.price - a.price
    }
}

const sortByName = (arr) =>
    arr.sort((a, b) => {
        const nameA = a.name?.trim().toLowerCase()
        const nameB = b.name?.trim().toLowerCase()
        if (nameA > nameB) return 1
        if (nameA < nameB) return -1
        return 0
    })

const initialState = {
    error: null,
    products: {
        all: [],
        filtered: [],
        selected: [],
        favorites: []
    },
    categories: {
        all: [],
        filtered: [],
        detail: []
    },
    tags: {
        all: [],
        filtered: []
    }
}

const main = (state = initialState, action) => {
    let newState = { ...state }

    switch (action.type) {
        default:
            break

        case ERROR:
            newState.error = action.payload
            break

        // CATEGORIES

        case FIND_CAT_BY_ID:
            newState.categories.detail = action.payload
            break

        case FETCH_CATEGORIES:
            newState.categories.all = sortByName(action.payload)
            newState.categories.filtered = action.payload
            break

        case SEARCH_CATEGORY:
            if (action.payload.error) newState.categories.filtered = []
            else newState.categories.filtered = sortByName(action.payload)
            break

        case CLEAN_CATEGORIES:
            newState.categories.filtered = newState.categories.all
            break

        case DELETE_CATEGORY:
            newState.categories.filtered = newState.categories.filtered.filter(
                (el) => el._id !== action.id
            )
            newState.categories.all = newState.categories.all.filter(
                (el) => el._id !== action.id
            )
            break

        // PRODUCTS

        case FETCH_PRODUCTS:
            newState.products.all = sortByName(action.payload)
            newState.products.filtered = action.payload
            break


        case CLEAN_SELECT_PRODUCT:
            newState.products.selected = {}
            break

        case FILTER_PRODUCTS:
            newState.products.filtered = []
            !!action.payload.length &&
                (newState.products.filtered = [...action.payload])
            break

        case FILTER_BY_CATEGORY:
            // action.price, action.categories, action.stock. action.rating
            newState.products.filtered = filterProduct(newState.products.all, action.categories, action.rating, action.stock, action.price)

            break

        case SEARCH_PRODUCT:
            if (action.name === "") {
                newState.products.filtered = newState.products.all
            }
            newState.products.filtered = newState.products.all.filter(
                (product) => {
                    let completeName = product.name
                    if (
                        completeName
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .includes(action.name)
                    ) {
                        return product
                    }
                }
            )
            break
        case "SEARCH_PRODUCT_ASYNC":
            newState.products.filtered = action.payload
            break

        case GET_FAVORITES:
              let coincidence = newState.products.favorites.find(el => el._id === action.payload._id)
              if(!coincidence) {
                 newState.products.favorites = [...newState.products.favorites, action.payload]
              }
        break

        case REMOVE_FAVORITE:
              newState.products.favorites = newState.products.favorites.filter(el=> el._id !== action.id)
        break


        case DELETE_PRODUCT:
            newState.products.filtered = newState.products.filtered.filter(
                (el) => el._id !== action.id
            )
            newState.products.all = newState.products.all.filter(
                (el) => el._id !== action.id
            )
            break

        case CLEAN_PRODUCTS:
            newState.products.filtered = newState.products.all
            break

        case FIND_PRODUCT_BY_ID:
            newState.products.selected = action.payload
            break
    }

    return { ...newState }
}

export default main
