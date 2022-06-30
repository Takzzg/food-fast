import React from "react"
import { ImageCategory, MainContainer, NameCategory } from "./categoryElements"
import styles from "./category.module.scss"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const CategoryCard = ({ category, url, color }) => {
    const theme = useSelector(state=>state.theme.selectedTheme)
    return (
        <Link to={url}>
            <MainContainer bgColor={color} theme={theme}>
                <ImageCategory
                    image={category.image && category.image.secure_url}
                />
                <NameCategory id={styles.categoryName}>
                    {category.name}
                </NameCategory>
            </MainContainer>
        </Link>
    )
}

export default CategoryCard
