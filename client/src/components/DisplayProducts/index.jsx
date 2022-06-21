import React from "react"
import { GlobalContainer } from "./displayElements"
import SingleProductCard from "./singleCard"
import FilterBar from "../filterBar"
import { CardsContainer } from "./displayElements"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchAllProducts } from "../../redux/actions/async"

export default function DisplayProducts() {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)
    const allProducts = useSelector((state) => state.main.products.all)
    const filterProducts = useSelector((state) => state.main.products.filtered)

    useEffect(() => {
        !allProducts?.length && dispatch(fetchAllProducts())
    }, [dispatch, allProducts])

    return (
        <GlobalContainer theme={theme}>
            <FilterBar />

            <CardsContainer theme={theme}>
                {filterProducts.length === 0 ? (
                    <div>No results found</div>
                ) : (
                    filterProducts.map((p, i) => (
                        <SingleProductCard key={i} product={p} />
                    ))
                )}
            </CardsContainer>
        </GlobalContainer>
    )
}

// http://localhost:3001/api/v1/products
