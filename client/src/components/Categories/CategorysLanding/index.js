import React from "react"
import { ImageCategory, MainContainer, NameCategory } from "./categoryElements"
import styles from "./category.module.scss"
import { baseUrl } from "../../../redux/actions/async"
import { Link } from "react-router-dom"

const CategoryCard = ({ category, url, color }) => (
    <Link to={url}>
        <MainContainer backcolor={color}>
            <ImageCategory
                image={`${baseUrl}/categories/img/${category._id}`}
            />
            <NameCategory id={styles.categoryName}>
                {category.name}
            </NameCategory>
        </MainContainer>
    </Link>
)

export default CategoryCard
