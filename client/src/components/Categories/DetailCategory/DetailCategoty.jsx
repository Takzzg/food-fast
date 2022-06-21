import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
    baseUrl,
    fetchProductsByCat,
    findCatById
} from "../../../redux/actions/async"
import { StyledCategoryDetail } from "./DetailCategory.styled"
import ProductCard from "../../Products/ProductCard/ProductCard"
import { clean_categories, clean_products } from "../../../redux/actions/sync"

const DetailCategory = () => {
    const { idCategory } = useParams()

    const dispatch = useDispatch()

    const theme = useSelector((state) => state.theme.selectedTheme)
    const category = useSelector((state) => state.main.categories.detail)
    const filteredProducts = useSelector(
        (state) => state.main.products.filtered
    )

    const products = () => {
        if (category) {
            let currentCategory = category.name
            if (filteredProducts.length !== 0) {
                let correctProducts = filteredProducts.filter(
                    (el) =>
                        el.categories && el.categories.includes(currentCategory)
                )
                return correctProducts
            }
            return []
        }
        return []
    }
    useEffect(() => {
        dispatch(findCatById(idCategory))
        dispatch(fetchProductsByCat(category.name))
    }, [dispatch, idCategory, category.name])

    useEffect(() => {
        return () => {
            dispatch(clean_categories())
            dispatch(clean_products())
        }
    })

    return !!category ? (
        <StyledCategoryDetail theme={theme}>
            <img
                src={`${baseUrl}/categories/img/${idCategory}`}
                alt="Category"
                height={"200"}
            />
            <div className="banner">{category.name}</div>
            <div className="products">
                {products().length !== 0 &&
                    products().map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))}
            </div>
        </StyledCategoryDetail>
    ) : (
        <h1>Loading...</h1>
    )
}

export default DetailCategory
