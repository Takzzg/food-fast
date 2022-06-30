import {
    GET_ALL_ORDERS,
    GET_ORDER_BY_ID,
    GET_USER_INFORMATION,
    GET_USER_ORDERS
} from "../actions/types"

const initialState = {
    ordersUser: [],
    allOrders: [],
    selected: {},
    userSelected: {}
}

const orders = (state = initialState, action) => {
    let newState = { ...state }

    switch (action.type) {
        case GET_ALL_ORDERS:
            newState.allOrders = action.payload
            break
        case GET_USER_ORDERS:
            newState.ordersUser = action.payload
            break
        case GET_ORDER_BY_ID:
            if (action.payload[1]) {
                newState.userSelected = action.payload[1]
            }
            newState.selected = action.payload[0]
            break
        case GET_USER_INFORMATION:
            newState.userSelected = action.payload
            break

        default:
            break
    }
    return { ...newState }
}
export default orders
