import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
// import { fetchAllCategories } from "./redux/actions/async"
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
// import Dashboard from "./components/User/Dashboard/Dashboard"
import ProductForm from "./components/Products/ProductForm/ProductForm"
import CategoryForm from "./components/Categories/CategoryForm"
import Orders from "./components/Orders/Orders"
import DetailOrder from "./components/Orders/DetailOrder/DetailOrder"
import ShoppingCart from "./components/shopCart"
import PrivateRoute from "./components/Auth/PrivateRoute"
import ProfileUser from "./components/CommonUser/profile/index"

import Profile from "./components/User/Profile"

import PaymentPass from "./components/PaymentPass"
import Dashboard2 from "./components/User/Dashboard/Dashboard2"
import WishList from "./components/CommonUser/wishList"

import UserReviews from "./components/Reviews/UserReviews"
import UserOrders from "./components/CommonUser/ordersList"
import OrderDetail from "./components/CommonUser/orderDetail"
import OrdersAdmin from "./components/User/orders"
import OrderAdminDetail from "./components/User/orders/orderDetailAndUpdate"
import { fetchAllCategories, fetchAllProducts } from "./redux/actions/async"
// import { fetchAllCategories, fetchAllProducts } from "./redux/actions/async"

const ScrollToTop = () => {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
}

function App() {
    // const [{isopen,user},dispatch]=useStateValue()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllCategories())
        dispatch(fetchAllProducts())
    }, [dispatch])

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
                    <Route path="/orders">
                        <Route path=":orderID" element={<OrderDetail />} />
                    </Route>
                    <Route path="/commonUser">
                        <Route path="profile" element={<ProfileUser />} />
                        <Route path=":userID/wishList" element={<WishList />} />
                        <Route path=":userID/orders" element={<UserOrders />} />
                    </Route>
                    <Route
                        path="/categories/:idCategory"
                        element={<DetailCategory />}
                    />

                    <Route path="/dashboard">
                        {/* <Route index element={<Dashboard />} /> */}
                        <Route
                            index
                            element={
                                <PrivateRoute
                                    element={Dashboard2}
                                    requiredRol="ADMIN"
                                />
                            }
                        />

                        {/* <Route path="orders" element={<OrdersAdmin />}/> */}
                        {/* <Route path="orders/:orderID" element={<OrderAdminDetail params='id'/>} /> */}

                        <Route
                            path="createProduct"
                            element={
                                <PrivateRoute
                                    element={ProductForm}
                                    requiredRol="ADMIN"
                                />
                            }
                        />

                        <Route
                            path="createCategory"
                            element={
                                <PrivateRoute
                                    element={CategoryForm}
                                    requiredRol="ADMIN"
                                />
                            }
                        />

                        {/* <Route
                            path="modifyCategory/:id"
                            element={<ModifyCategory />}
                        /> */}
                        <Route
                            path="modifyCategory/:id"
                            element={
                                <PrivateRoute
                                    element={ModifyCategory}
                                    requiredRol="ADMIN"
                                />
                            }
                        />

                        {/* <Route
                            path="updateProduct/:id"
                            element={<UpdateProduct />}
                        /> */}
                        <Route
                            path="updateProduct/:id"
                            element={
                                <PrivateRoute
                                    element={UpdateProduct}
                                    requiredRol="ADMIN"
                                />
                            }
                        />
                    </Route>
                    <Route path="user/:idUser">
                        <Route index element={<Profile />} />

                        <Route path="orders">
                            <Route index element={<Orders />} />
                            <Route path=":idOrder" element={<DetailOrder />} />
                        </Route>

                        <Route path="reviews">
                            <Route index element={<UserReviews />} />
                            {/* <Route
                                path=":idReview"
                                element={<DetailReview />}
                            /> */}
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
                        <Route
                            path="succesPay/:isAcepted"
                            element={<PaymentPass />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
