import { useSelector } from "react-redux"
import { FaDollarSign } from "react-icons/fa"
import { StyledProductCard } from "./ProductCard.styled"
import { baseUrl } from "../../../redux/actions/async"

const ProductCard = ({ product }) => {
    const { _id, name, price, description } = product

    const theme = useSelector((state) => state.theme.selectedTheme)

    return (
        <StyledProductCard
            theme={theme}
            key={_id}
            to={`/products/${_id}`}
            img={product.image && product.image.secure_url}
        >
            <div className="img" />
            <div className="header">
                <span className="name">{name}</span>
                <span className="price">
                    <FaDollarSign />
                    {price}
                </span>
            </div>
            <span className="description">
                {description || "agregar descripcion"}
            </span>
        </StyledProductCard>
    )
}

export default ProductCard
