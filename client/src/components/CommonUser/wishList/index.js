import React, { useEffect, useState } from "react";
import SingleCard from "./singleCard";
import { CardsContainer, GlobalContainer,TitleContainer } from "./favoritesElements";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"; 
import { getFavorites } from "../../../redux/actions/async";

export default function WishList () {
    const [list, setList] = useState([]);
    const dispatch = useDispatch(); 

    const usuario = useSelector(state=> state.user.authData.user);
    const favorites = useSelector(state=> state.main.products.favorites)
    const getData = async (id) => {
        const response = await axios.get(`http://localhost:3001/api/v1/favorites/${id}`)
        await response.data.products.map(p=> dispatch(getFavorites(p)))
        setList(response.data.products)
    }

    useEffect(()=> {
        getData(usuario._id); 
    }, [favorites])

    return(<GlobalContainer>
        <TitleContainer>Wish List</TitleContainer>
        <CardsContainer>
            {favorites.map(p=> <SingleCard key={p._id} product={p}/>)}
        </CardsContainer>
    </GlobalContainer>)
}


