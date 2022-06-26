import { GET_ORDER_BY_ID, GET_USER_ORDERS } from "../actions/types"


const initialState = {
    ordersUser: [],
    allOrders: [],
    selected: {}
}

const orders = (state = initialState, action) => {
    let newState = { ...state }

    switch (action.type) {
        case GET_USER_ORDERS:
            newState.ordersUser = action.payload; 
            break
        case GET_ORDER_BY_ID: 
            newState.selected = action.payload; 
        break
        default:
            break
    }
    return { ...newState }
}
export default orders
