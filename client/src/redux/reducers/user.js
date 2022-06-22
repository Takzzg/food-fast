import { AUTH_USER, AUTH_ERROR, LOG_OUT } from "../actions/types"

const user = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH_USER:
            localStorage.setItem("profile", JSON.stringify({ ...action?.payload }))
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
