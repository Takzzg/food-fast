import React from "react"
import { useDispatch, useSelector } from "react-redux"
import CategoryBar from "./UbicationBar/UbicationBar"
import { CategoriesContainer, GlobalContainer } from "./landingElements"
import CategoryCard from "../Categories/CategorysLanding"
import { useEffect } from "react"
import {
    fetchAllCategories
    // searchCategory,
    // searchProduct
} from "../../redux/actions/async"

const Landing = () => {
    const dispatch = useDispatch()
    const allCategories = useSelector((state) => state.main.categories.all)
    const filterCategories = useSelector(
        (state) => state.main.categories.filtered
    )

    const getColor = (i) =>
        `hsl(${(255 / filterCategories.length) * i}, 100%, 33%)`

    useEffect(() => {
        !allCategories.length && dispatch(fetchAllCategories())
    }, [dispatch])

    return (
        <GlobalContainer
            bgImg={
                "https://www.minervafoods.com/wp-content/uploads/2017/02/como_fazer_hamburguer_caseiro_0.jpg"
            }
        >
            <div className="ornament" />
            <h1 className="welcome">Everything you want in one place</h1>

            <CategoryBar className="LocationBar" />
            <CategoriesContainer>
                {filterCategories.map((c, i) => (
                    <CategoryCard
                        key={c._id}
                        category={c}
                        color={() => getColor(i)}
                        url={`/categories/${c._id}`}
                    />
                ))}
            </CategoriesContainer>
        </GlobalContainer>
    )
}

export default Landing
