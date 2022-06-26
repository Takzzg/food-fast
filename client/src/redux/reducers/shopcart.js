import {
    ADD_ITEM_CAR,
    REMOVE_ITEM_CAR,
    REMOVE_ALL_ITEM_CAR,
    CLEAN_CAR,
    GET_ITEMS_CAR,
    ADD_USER_ITEMS
} from "../actions/types"

const initialState = {
    shopCart: []
}
const json = JSON.parse(window.localStorage.getItem("shoppingCart"))

const shopCart = (state = initialState, action) => {
    let newState = { ...state }

    const index = newState.shopCart.findIndex(
        (el) => el._id === action.payload?._id
    )
    if (json) {
        newState = json
    }

    switch (action.type) {
        case ADD_USER_ITEMS:
            newState.shopCart = action.payload;    
        break
        case ADD_ITEM_CAR:
            if (index !== -1) {
                newState.shopCart[index].quantity =
                    newState.shopCart[index].quantity + 1
            } else {
                let item = { ...action.payload, quantity: 1 }
                newState.shopCart.push(item)
            }
            break

        case REMOVE_ITEM_CAR:
            if (index !== -1) {
                if (newState.shopCart[index].quantity > 1) {
                    newState.shopCart[index].quantity =
                        newState.shopCart[index].quantity - 1
                } else {
                    newState.shopCart.filter(
                        (el) => el._id !== action.payload._id
                    )
                }
            }
            break

        case REMOVE_ALL_ITEM_CAR:
            newState.shopCart = newState.shopCart.filter(
                (el) => el._id !== action.payload._id
            )
            break
        case CLEAN_CAR:
            newState.shopCart = []
            break
        // case "DEFAULT":
        //     newState = newState;
        // break
        default:
            break
    }
    window.localStorage.setItem("shoppingCart", JSON.stringify(newState))
    return { ...newState }
}
export default shopCart
