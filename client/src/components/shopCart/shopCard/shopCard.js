import React, { useEffect, useState } from "react";
import { FifthColumn, FirstColumn, FourthColumn, MainContainer, SecondColumn, ThirdColumn } from "./cardElements";
import { baseUrl } from "../../../redux/actions/async";
import {AiFillPlusCircle, AiFillMinusCircle} from "react-icons/ai"; 
import { useDispatch } from "react-redux";
import { add_item_car, remove_item_car } from "../../../redux/actions/sync";
import {TbShoppingCartOff} from "react-icons/tb"

export default function ShopProductCard({product, setCharge, charge}) {

    const [quantity, setQuantity] = useState(1); 

    const dispatch = useDispatch(); 
    const addItem = () => {
        dispatch(add_item_car(product))
        setQuantity(Number(quantity) + 1)
        setCharge(!charge);
    }
    const removeItem = (all=false) => {
        if(!all) {
            dispatch(remove_item_car(product))
            setQuantity(Number(quantity) - 1)
        } else {
            dispatch(remove_item_car(product, all))
            setQuantity(0)
        }
        setCharge(!charge);
    }

    useEffect(()=> {
        setQuantity(product.quantity)
    }, [])

    return(
    <MainContainer>
        <FirstColumn>
            <img src={`${baseUrl}/products/img/${product._id}`} alt="product"/>
        </FirstColumn>
        
        <SecondColumn>
            {product.name}
        </SecondColumn>
        
        <ThirdColumn>
            <div>
                <AiFillMinusCircle  id="remove" onClick={()=>removeItem()}/>
                    {product.quantity}
                <AiFillPlusCircle id="add" onClick={addItem}/>
            </div>
            <div>
                <TbShoppingCartOff id="remove_all" onClick={()=>removeItem(true)} />
            </div>
        </ThirdColumn>

        <FourthColumn>
            $/ {product.price}
        </FourthColumn>

        <FifthColumn>
           $/ {product.price * product.quantity}
        </FifthColumn>
    </MainContainer>)
}