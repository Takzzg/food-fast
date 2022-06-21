import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { fetchAllCategories } from "./redux/actions/async"
import { useDispatch, useSelector } from "react-redux"

import GlobalStyle from "./GlobalStyles"
import DisplayProducts from "./components/DisplayProducts/index"
import ModifyCategory from "./components/Categories/CategoryUpdate"
import UpdateProduct from "./components/Products/updateProduct"
import Login from "./components/Auth/Login"
import Logup from "./components/Auth/Logup"
import PasswordReset from "./components/Auth/PasswordReset"
import NewPassword from "./components/Auth/NewPassword"
import NavBar from "./components/NavBar/NavBar"
import Landing from "./components/Landing/Landing"
import DetailProduct from "./components/Products/DetailProduct/DetailProduct"
import DetailCategory from "./components/Categories/DetailCategory/DetailCategoty"
import Dashboard from "./components/User/Dashboard/Dashboard"
import ProductForm from "./components/Products/ProductForm/ProductForm"
import CategoryForm from "./components/Categories/CategoryForm"
import Profile from "./components/User/Profile"
import Orders from "./components/Orders/Orders"
import DetailOrder from "./components/Orders/DetailOrder/DetailOrder"
import Reviews from "./components/Reviews/Reviews"
import DetailReview from "./components/Reviews/DetailReview/DetailReview"
import ShoppingCart from "./components/shopCart"

const ScrollToTop = () => {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
}

function App() {
    // const [{isopen,user},dispatch]=useStateValue()
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)

    useEffect(() => {
        dispatch(fetchAllCategories())
    }, [dispatch])

    return (
        <div className="App">
            <BrowserRouter>
                <GlobalStyle theme={theme} />
                <ScrollToTop />

                <NavBar />

                <Routes>
                    <Route index element={<Landing />} />

                    <Route path="/products">
                        <Route index element={<DisplayProducts />} />
                        <Route path=":idProduct" element={<DetailProduct />} />
                    </Route>

                    <Route
                        path="/categories/:idCategory"
                        element={<DetailCategory />}
                    />

                    <Route path="/dashboard">
                        <Route index element={<Dashboard />} />
                        <Route path="createProduct" element={<ProductForm />} />
                        <Route
                            path="createCategory"
                            element={<CategoryForm />}
                        />

                        <Route
                            path="modifyCategory/:id"
                            element={<ModifyCategory />}
                        />

                        <Route
                            path="updateProduct/:id"
                            element={<UpdateProduct />}
                        />
                    </Route>

                    <Route path="user/:idUser">
                        <Route index element={<Profile />} />

                        <Route path="orders">
                            <Route index element={<Orders />} />
                            <Route path=":idOrder" element={<DetailOrder />} />
                        </Route>

                        <Route path="reviews">
                            <Route index element={<Reviews />} />
                            <Route
                                path=":idReview"
                                element={<DetailReview />}
                            />
                        </Route>
                    </Route>

                    {/* LOGIN */}
                    <Route path="/login" element={<Login />} />
                    {/* REGISTER */}
                    <Route path="/logup" element={<Logup />} />

                    <Route path="/user">
                        <Route path="shoppingCart" element={<ShoppingCart />} />
                    </Route>

                    {/* LOGIN */}
                    <Route path="/login" element={<Login />} />
                    {/* REGISTER */}
                    <Route path="/logup" element={<Logup />} />
                    {/* PASS RESET */}
                    <Route path="/passwordReset" element={<PasswordReset />} />
                    {/* NEW PASS */}
                    <Route path="/newPassword" element={<NewPassword />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
