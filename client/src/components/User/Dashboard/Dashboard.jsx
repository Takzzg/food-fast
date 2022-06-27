import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CategoryCard from "../../Categories/CategoryCard/CategoryCard"
import ProductCard from "../../Products/ProductCard/ProductCard"
import { StyledCard, StyledDashboard } from "./Dashboard.styled"
import CategoryBar from "../../Landing/UbicationBar/UbicationBar"
import SearchBar from "../../searchBar"
import { useEffect } from "react"
import {
    fetchAllCategories,
    fetchAllProducts
} from "../../../redux/actions/async"
import useDelete from "../../CustomHooks/useDelete"

import { FaTrashAlt, FaEdit } from "react-icons/fa"

const Dashboard = () => {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)
    const allProducts = useSelector((state) => state.main.products.all)
    const allCategories = useSelector((state) => state.main.categories.all)
    const filterCategories = useSelector(
        (state) => state.main.categories.filtered
    )
    const filterProducts = useSelector((state) => state.main.products.filtered)

    const { handleDelete } = useDelete(dispatch)

    useEffect(() => {
        !allCategories.length && dispatch(fetchAllCategories())
        !allProducts.length && dispatch(fetchAllProducts())
    }, [dispatch])

    const Category = ({ c }) => (
        <StyledCard theme={theme}>
            <CategoryCard category={c} url={`/categories/${c._id}`} />
            <button
                className="deleteBtn"
                onClick={() => handleDelete("categories", c._id, c.img)}
            >
                <FaTrashAlt />
                Delete
            </button>
            <Link className="editBtn" to={`/dashboard/modifyCategory/${c._id}`}>
                <FaEdit />
                Edit
            </Link>
        </StyledCard>
    )

    const Product = ({ p }) => (
        <StyledCard theme={theme}>
            <ProductCard product={p} />
            <button
                className="deleteBtn"
                onClick={() => handleDelete("products", p._id, p.img)}
            >
                <FaTrashAlt />
                Delete
            </button>
            <Link className="editBtn" to={`/dashboard/updateProduct/${p._id}`}>
                <FaEdit />
                Edit
            </Link>
        </StyledCard>
    )

    return (
        <StyledDashboard theme={theme}>
            <h1 className="title">Dashboard </h1>

            <div className="content">
                <div className="categories">
                    <CategoryBar />

                    <Link className="addBtn" to="createCategory"> 
                        Crear categoria nueva
                    </Link>

                    <div className="allCategories">
                        {filterCategories.length === 0 ? (
                            <div>Not results found</div>
                        ) : (
                            filterCategories.map((c) => (
                                <Category key={c._id} c={c} />
                            ))
                        )}
                    </div>
                </div>

                <div className="products">
                    <SearchBar />

                    <Link className="addBtn" to="createProduct">
                        Crear producto nuevo
                    </Link>

                    <div className="allProducts">
                        {filterProducts.length === 0 ? (
                            <div>Not results found</div>
                        ) : (
                            filterProducts.map((p) => (
                                <Product p={p} key={p._id} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </StyledDashboard>
    )
}

export default Dashboard
