import React from "react";
import axios from "axios"; 

import {
  MainContainer,
TitleContainer,
ItemsContainer,
SubTotalContainer,
AditionalContainer,
TotalContainer,
GoPayContainer
} from "./elements";

export default function OrdenSumary({items, subTotal}) {

  // const handlePay = async (mount) => {
  //   const response = await axios.post("http://localhost:3001/api/v1/paypal/createOrden", {
  //     value: mount.toString()
  //   } )
  //   const data = await response.data
  //   console.log(data)
  // }
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
            <button >Go pay</button>
        </GoPayContainer>
    </MainContainer>
  );
}
