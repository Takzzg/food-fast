import {
    CLEAN_CATEGORIES,
    CLEAN_PRODUCTS,
    CLEAN_SELECT_PRODUCT,
    DELETE_CATEGORY,
    DELETE_PRODUCT,
    ERROR,
    FETCH_CATEGORIES,
    FETCH_PRODUCTS,
    FILTER_PRODUCTS,
    FIND_CAT_BY_ID,
    FIND_PRODUCT_BY_ID,
    GET_FAVORITES,
    NESTED_FILTERING,
    REMOVE_FAVORITE,
    SEARCH_CATEGORY,
    SEARCH_PRODUCT,
} from "../actions/types"
import FilterFunction from "./FilterFunction"


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
            newState.products.filtered = action.payload.filter(el=> el.stock > 0); 
            break


        case CLEAN_SELECT_PRODUCT:
            newState.products.selected = {}
            break

        case FILTER_PRODUCTS:
            newState.products.filtered = []
            !!action.payload.length &&
                (newState.products.filtered = [...action.payload])
            break

        case NESTED_FILTERING:
                let data = FilterFunction(newState.products.all, action.filterOptions)
                newState.products.filtered = data; 
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
