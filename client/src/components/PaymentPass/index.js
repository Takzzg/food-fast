import React, { useEffect, useReducer, useState } from "react"
import deliveryPNG from "../../assets/delivery.png"
import { useParams, Link } from "react-router-dom"
import {
    GlobalContainer,
    TitleContainer,
    IMGContainer,
    DescriptionContainer,
    ButtonsContainer
} from "./payElements"
import { useDispatch, useSelector } from "react-redux"
import { clean_car } from "../../redux/actions/sync"
import { IoMdArrowRoundBack } from "react-icons/io"
import { GrDocumentText } from "react-icons/gr"
import axios from "axios"
import { getTotal } from "./functions"

export default function PaymentPass() {
    const [order, setOrder] = useState({})
    const params = useParams()
    const dispatch = useDispatch()
    const shopcart = useSelector((state) => state.shopCart.shopCart)
    const user = useSelector((state) => state.user.authData.user)

    useEffect(() => {
        const after = async () => {
            if (params.isAcepted) {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACK_URL}/api/v1/paypal/stock`,
                    {
                        userID: user._id,
                        total: getTotal(shopcart),
                        resumeOrder: shopcart.map((el) => ({
                            id: el._id,
                            name: el.name,
                            price: el.price,
                            quantity: el.quantity,
                            subTotal: el.price * el.quantity,
                            newStock: el.stock - el.quantity
                        }))
                    }
                )
                setOrder(response.data)
                await axios.delete(
                    `${process.env.REACT_APP_BACK_URL}/api/v1/user/shopCart/${user._id}`
                )
                dispatch(clean_car())
            }
        }
        if (shopcart.length !== 0) after()
    }, [])
    return (
        <GlobalContainer>
            <TitleContainer>THANKS FOR YOUR SHOPPING</TitleContainer>

            <IMGContainer>
                <img src={deliveryPNG} alt="delivery" />
            </IMGContainer>
            <DescriptionContainer>
                Your order is on its way to your house.
            </DescriptionContainer>
            <ButtonsContainer>
                <Link to="/">
                    <div id="back">
                        <IoMdArrowRoundBack />
                    </div>
                </Link>

                <Link to={`/orders/${order._id}`}>
                    <div id="order">
                        See the order <GrDocumentText />
                    </div>
                </Link>
            </ButtonsContainer>
        </GlobalContainer>
    )
}
