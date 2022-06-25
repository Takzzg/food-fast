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
import {useDispatch, useSelector} from "react-redux";
import { clean_car } from "../../redux/actions/sync";
import {IoMdArrowRoundBack} from "react-icons/io"; 
import {GrDocumentText} from "react-icons/gr"
import axios from "axios"; 

export default function PaymentPass() {
  const params = useParams(); 
  const dispatch = useDispatch(); 
  const shopcart = useSelector(state=> state.shopCart.shopCart)
  useEffect(()=> {
    const after = async ()=> {
      if (params.isAcepted){
        await axios.patch('http://localhost:3001/api/v1/paypal/stock', {
          resumeOrder: shopcart.map(el=> ({id: el._id, newStock: el.stock - el.quantity}))
        })
        dispatch(clean_car())       
      }
    }
    after(); 

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
