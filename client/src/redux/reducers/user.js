import { 
    AUTH_USER, 
    AUTH_ERROR, 
    LOG_OUT, 
    GOOGLE_LOGIN, 
    FETCH_USERS,
    DELETE_USER,
    ROL_CHANGE
 } from "../actions/types"

const initialState = { 
    authData: JSON.parse(window.localStorage.getItem("profile")) || null,
    usersData: []
}

const user = (state = initialState, action) => {
    
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
            window.localStorage.removeItem('profile')
            return { ...state, authData: null }

        case FETCH_USERS:
            return {...state, usersData: action.payload}

        case DELETE_USER:
            let filteredUsers = state.usersData.filter(
                el => el._id !== action.id
            )
            return {...state, usersData: filteredUsers}

        case ROL_CHANGE:
            let editedUsers = state.usersData.map(u=>{
                if(u._id === action.payload.id) u.rol = action.payload.rol
                return u;
            })
            return {...state, usersData: editedUsers}
            
        default:
            return state
    }
}

export default user
