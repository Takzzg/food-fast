import { AUTH_USER, LOG_OUT } from "../actions/types"

const user = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH_USER:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }

        case LOG_OUT:
            localStorage.clear()
            return { ...state, authData: null }

        default:
            return state
    }
}

export default user
