import React from "react"
import { ImageCategory, MainContainer, NameCategory } from "./categoryElements"
import styles from "./category.module.scss"
import { Link } from "react-router-dom"

const CategoryCard = ({ category, url, color }) => (
    <Link to={url}>
        <MainContainer bgColor={color}>
            <ImageCategory
                image={category.image && category.image.secure_url}
            />
            <NameCategory id={styles.categoryName}>
                {category.name}
            </NameCategory>
        </MainContainer>
    </Link>
)

export default CategoryCard
