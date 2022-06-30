import React, { useState } from "react"
import axios from "axios"

import {
    MainContainer,
    TitleContainer,
    ItemsContainer,
    SubTotalContainer,
    AditionalContainer,
    TotalContainer,
    GoPayContainer
} from "./elements"
import { useSelector } from "react-redux"

export default function OrdenSumary({ items, subTotal }) {
    const user = useSelector((state) => state.user.authData)
    const [err, setErr] = useState(false)

    const handlePay = async (mount) => {
        try {
            if (user) {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACK_URL}/api/v1/paypal/createOrden`,
                    {
                        mount: mount,
                        description: `Estas comprando ${items} items de FoodFast`
                    }
                )
                window.location.replace(response.data)
            } else {
                alert("You must be login for continuos")
            }
        } catch (e) {
            setErr(true)
        }
    }
    return (
        <MainContainer>
            <TitleContainer>Order Sumary</TitleContainer>
            <ItemsContainer>
                <div className="label">Items: </div>
                <div className="number">{items}</div>
            </ItemsContainer>

            <SubTotalContainer>
                <div className="label">Subtotal: </div>
                <div className="number">$/ {subTotal}</div>
            </SubTotalContainer>

            <AditionalContainer>
                <div className="label">Shipping: </div>
                <div className="number">$/ 12</div>
            </AditionalContainer>

            <TotalContainer>
                <div className="label">Total: </div>
                <div className="number">$/ {subTotal}</div>
            </TotalContainer>

            <GoPayContainer>
                <button onClick={() => handlePay(subTotal)}>Go pay</button>
            </GoPayContainer>
        </MainContainer>
    )
}
