import { AUTH_USER, AUTH_ERROR, LOG_OUT, GOOGLE_LOGIN } from "../actions/types"

const user = (state = { authData: JSON.parse(window.localStorage.getItem("profile")) || null }, action) => {
    switch (action.type) {
        case AUTH_USER:
            localStorage.setItem("profile", JSON.stringify({ ...action?.payload }))        
            return { ...state, authData: action?.payload }

        case GOOGLE_LOGIN:
            localStorage.setItem("profile", JSON.stringify({...action?.payload}))
            let data2 = {shopCart: action.payload.user.shopCart}
            window.localStorage.setItem("shoppingCart", JSON.stringify(data2))
            return { ...state, authData: action?.payload }

        case AUTH_ERROR:
            return { ...state, authData: action?.payload}

        case LOG_OUT:
            localStorage.clear()
            return { ...state, authData: null }

        default:
            return state
    }
}

export default user
