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

export default function OrdenSumary({items, subTotal}) {
  const user = useSelector(state=> state.user.authData);
  const theme = useSelector(state=>state.theme.selectedTheme) 
  const [err, setErr] = useState(false); 

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
    <MainContainer theme={theme}>
        <TitleContainer>Resumen de pedido</TitleContainer>
        <ItemsContainer>
            <div className="label">Items: </div>
            <div className="number">{items}</div>
        </ItemsContainer>

        <AditionalContainer>
            <div className="label">Envío: </div>
            <div className="number">$/ 12</div>
        </AditionalContainer>

        <SubTotalContainer>
            <div className="label">Subtotal: </div>
            <div className="number">$/ {subTotal}</div>
        </SubTotalContainer>

        <TotalContainer>
            <div className="label">Total: </div>
            <div className="number">$/ {subTotal}</div>
        </TotalContainer>

        <GoPayContainer>
            <button style={{fontSize: "20px", fontWeight: "bold"}} onClick={()=> handlePay(subTotal)}>Pagar</button>
        </GoPayContainer>
    </MainContainer>
  );
}
