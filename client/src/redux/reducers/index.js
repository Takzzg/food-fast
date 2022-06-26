import { combineReducers } from "redux"

import main from "./main"
import theme from "./theme"
import user from "./user"
import shopCart from "./shopcart"
import orders from "./orders"

export default combineReducers({
    main,
    theme,
    user,
    shopCart,
    orders
})
