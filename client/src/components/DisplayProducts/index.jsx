import React, { useState } from "react"
import { GlobalContainer } from "./displayElements"
import SingleProductCard from "./singleCard"
import FilterBar from "../filterBar"
import { CardsContainer } from "./displayElements"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchAllProducts, getShopCartUser } from "../../redux/actions/async"
import axios from "axios"
import Loading from "../Loading/Loading"

export default function DisplayProducts() {
    const [list, setList] = useState([])
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)
    const allProducts = useSelector((state) => state.main.products.all)
    const filterProducts = useSelector((state) => state.main.products.filtered)
    const userSelector = useSelector(
        (state) => state.user.authData && state.user.authData.user
    )

    useEffect(() => {
        !allProducts?.length && dispatch(fetchAllProducts())
    }, [dispatch, allProducts])

    const getData = async (id) => {
        const response = await axios.get(
            `http://localhost:3001/api/v1/favorites/${id}`
        )
        setList(response.data.products)
        dispatch(getShopCartUser(id))
    }

    useEffect(() => {
        setUser(userSelector)
        if (user) getData(user._id)
    }, [user])

    return (
        <GlobalContainer theme={theme}>
            <FilterBar />
            <CardsContainer theme={theme}>
                {filterProducts.length === 0 ? (
                    <Loading text="Buscando productos" />
                ) : (
                    filterProducts.map((p, i) => (
                        <SingleProductCard key={i} product={p} list={list} />
                    ))
                )}
            </CardsContainer>
        </GlobalContainer>
    )
}

// http://localhost:3001/api/v1/products
