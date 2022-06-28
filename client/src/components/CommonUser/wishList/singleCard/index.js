import React from "react";
import { Imagen, Info, CardContainer } from "./elements";
import { baseUrl } from "../../../../redux/actions/async";
import {IoTrashBinOutline} from "react-icons/io5"; 
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { remove_favorite } from "../../../../redux/actions/sync";

export default function SingleCard ({product}) {
    const dispatch = useDispatch(); 
    const user = useSelector((state)=> state.user.authData.user)

    const handleRemoveFavorite = async () => {
        await axios.post(`http://localhost:3001/api/v1/favorites/${user._id}`, {
            idProduct: product._id
        })
        dispatch(remove_favorite(product._id))
    }

    return(
    <CardContainer>
        <Imagen img={product.image && product.image.secure_url}>
            
            <Info id="info">
                <IoTrashBinOutline onClick={handleRemoveFavorite}/>
                <p id="headline">{product.name}</p>
                <p id="description">{product.description}</p>
            </Info>
        </Imagen>
    </CardContainer>

    )
}