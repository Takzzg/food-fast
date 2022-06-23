import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
// import { fetchAllCategories } from "./redux/actions/async"
import { useSelector } from "react-redux"

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
import PrivateRoute from "./components/Auth/PrivateRoute"
import PaymentPass from "./components/PaymentPass"

const ScrollToTop = () => {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
}

function App() {
    // const [{isopen,user},dispatch]=useStateValue()
    // const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)


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

                    <Route path="/dashboard" element={<PrivateRoute
                    element={Dashboard}  requiredRol="ADMIN" />}/> {/* requiredRol="ADMIN" */}

                    <Route path="/dashboard">
                        {/* <Route index element={<Dashboard />} /> */}
                        <Route index element={<PrivateRoute
                    element={Dashboard}  requiredRol="ADMIN" />}/>

                        {/* <Route path="createProduct" element={<ProductForm />} /> */}
                        <Route path="createProduct" element={<PrivateRoute
                    element={ProductForm}  requiredRol="ADMIN" />}/>

                        {/* <Route
                            path="createCategory"
                            element={<CategoryForm />}
                        /> */}
                        <Route path="createCategory" element={<PrivateRoute
                    element={CategoryForm}  requiredRol="ADMIN" />}/>

                        {/* <Route
                            path="modifyCategory/:id"
                            element={<ModifyCategory />}
                        /> */}
                        <Route path="modifyCategory/:id" element={<PrivateRoute
                    element={ModifyCategory}  requiredRol="ADMIN" />}/>

                        {/* <Route
                            path="updateProduct/:id"
                            element={<UpdateProduct />}
                        /> */}
                        <Route path="updateProduct/:id" element={<PrivateRoute
                    element={UpdateProduct}  requiredRol="ADMIN" />}/>
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
                    {/* PASS RESET */}
                    <Route path="/passwordReset" element={<PasswordReset />} />
                    {/* NEW PASS */}
                    <Route path="/newPassword" element={<NewPassword />} />

                    <Route path="/user">
                        <Route path="shoppingCart" element={<ShoppingCart />} />
                        <Route path="succesPay/:isAcepted" element={<PaymentPass />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
