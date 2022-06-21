import React, { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { GlobalContainer, SearchIcon, SearchInput } from "./searchElements"
import { useDispatch, useSelector } from "react-redux"
import { searchProduct } from "../../redux/actions/async"

export default function SearchBar() {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)

    const handleChange = (e) => {
        setInput(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    const handleSubmit = () => {
        dispatch(searchProduct(input))
    }
    return (
        <GlobalContainer>
            <SearchInput
                name="searchBar"
                value={input}
                onChange={handleChange}
                placeholder="Search..."
            />
            <SearchIcon theme={theme} onClick={handleSubmit}>
                <AiOutlineSearch />
            </SearchIcon>
        </GlobalContainer>
    )
}
