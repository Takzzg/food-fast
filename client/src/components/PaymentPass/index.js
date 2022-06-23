import React, { useEffect } from "react";
import deliveryPNG from "../../assets/delivery.png"
import { useParams, Link } from "react-router-dom";
import {
  GlobalContainer,
  TitleContainer,
  IMGContainer,
  DescriptionContainer,
  ButtonsContainer,
} from "./payElements";
import {useDispatch} from "react-redux";
import { clean_car } from "../../redux/actions/sync";
import {IoMdArrowRoundBack} from "react-icons/io"; 
import {GrDocumentText} from "react-icons/gr"

export default function PaymentPass() {
  const params = useParams(); 
  const dispatch = useDispatch(); 

  useEffect(()=> {
    if (params.isAcepted){
      dispatch(clean_car())    
    }
  }, [])
  return (<GlobalContainer>
    <TitleContainer>THANKS FOR YOUR SHOPPING</TitleContainer>

    <IMGContainer>
        <img src={deliveryPNG} alt ="delivery"/>
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

      <Link to="/">
        <div id="order">See the order <GrDocumentText /></div>
      </Link>
    </ButtonsContainer>
  </GlobalContainer>)
}
