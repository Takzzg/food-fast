import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
    baseUrl,
    fetchAllProducts,
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
    const allProducts = useSelector((state)=> state.main.products.all)

    const products = () => {
        if (!category || !allProducts.length) return []

        let currentCategory = category.name
        let correctProducts = allProducts.filter(
            (el) => el.categories && el.categories.includes(currentCategory) && el.stock > 0
        )
        
        return correctProducts
    }
    useEffect(() => {
        dispatch(findCatById(idCategory))
        dispatch(fetchProductsByCat(category.name))
    }, [dispatch, idCategory, category.name])
    useEffect(()=> {
        dispatch(fetchAllProducts())
    }, [])
    useEffect(() => {
        return () => {
            dispatch(clean_categories())
            dispatch(clean_products())
        }
    })

    return !!category ? (
        <StyledCategoryDetail
            theme={theme}
            img={category.image && category.image.secure_url} 
        >
            <div className="banner">
                <div id="name">{category.name}:</div>
                <div id="description">{category.description}</div>
            </div>
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
