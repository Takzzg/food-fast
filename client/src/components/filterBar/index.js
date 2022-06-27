import React, { useEffect, useState } from "react"
import SearchBar from "../searchBar/index"
import Modal from "react-modal"
import { AiOutlineFilter, AiFillCloseCircle } from "react-icons/ai"
import {
    FilterContainer,
    GlobalContainer,
    UserContainer,
    ListContainer,
    MyH4,
    IconClose,
    FilterButton,
    ButtonContainer
} from "./filterElements"
import { FaUserAlt, FaShoppingCart } from "react-icons/fa"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import { filterbyCategories } from "../../redux/actions/sync"
import { fetchAllProducts } from "../../redux/actions/async"
import { Link } from "react-router-dom"
const OptionsTest = [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
    { value: "test3", label: "test3" }
]
export default function FilterBar() {
    const [isOpen, setIsOpen] = useState(false)
    let categories = useSelector((state) => state.main.categories.filtered)
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)
    const [categoriesfilter, setCategoriesfilter] = useState([])
    const [price, setPrice] = useState("1")

    const [filter, setFilter] = useState({
        categories: [], price: "1", rating: null, stock:"-1"})

    const user = useSelector((state)=> state.user.authData && state.user.authData.user)

    let getCategories = () => {
        if (categories.length !== 0) {
            return categories.map((el) => {
                return { value: el.name, label: el.name }
            })
        }
        return []
    }

    const PricesValues = [
        {
            value: "1",
            label: "Ascendente"
        },
        {
            value: "-1",
            label: "Descendente"
        }
    ]
    const RatingValues = [ 
        {
            value: 1,
            label: "Rating: 1"
        },
        {
            value: 2,
            label: "Rating: 2"
        },
        {
            value: 3,
            label: "Rating: 3"
        },
        {
            value: 4,
            label: "Rating: 4"
        },
        {
            value: 5,
            label: "Rating: 5"
        }
    ]; 

    const handleCleanFilter = () => {
        setCategoriesfilter([])
        dispatch(fetchAllProducts())
        setIsOpen(false)
    }
    // ==============================================
        const handleChangePrice = (e) => {
            setFilter({...filter, price: e.value})
        }
        const handleChangeCategories = (e) => {
            setFilter({...filter, categories: e})

        }

        const handleChangeStock = (e) => {
            setFilter({...filter, stock: e.value})
        }

        const handleChangeRating = (e) => {
            setFilter({...filter, rating: e.value})

        }
    // ==============================================

    const handleApplyFilter = () => {
        dispatch(filterbyCategories(filter))
        setIsOpen(false)
        setCategoriesfilter([])
    }
    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }
    useEffect(() => {
        Modal.setAppElement("body")
    }, [])

    return (
        <GlobalContainer theme={theme}>
            <FilterContainer theme={theme}>
                <div onClick={handleOpen}>
                    <AiOutlineFilter />
                    Filtrar Resultados
                </div>
                <Modal isOpen={isOpen}>
                    {console.log(filter)}
                    <IconClose>
                        <AiFillCloseCircle onClick={handleClose} />
                    </IconClose>
                    <ListContainer>
                        <MyH4>By category:</MyH4>
                        <Select
                            options={getCategories()}
                            isMulti
                            name="categories"
                            onChange={handleChangeCategories}
                        />
                    </ListContainer>

                    <ListContainer>
                        <MyH4>By price:</MyH4>
                        <Select
                            name="price"
                            options={PricesValues}
                            onChange={handleChangePrice}
                        />
                    </ListContainer>

                    <ListContainer>
                        <MyH4>By rating:</MyH4>
                        <Select options={RatingValues} onChange={handleChangeRating} name="rating"/>
                    </ListContainer>

                    <ListContainer>
                        <MyH4>By stock:</MyH4>
                        <Select options={PricesValues} onChange={handleChangeStock} name="stock"/>
                    </ListContainer>

                    <ButtonContainer>
                        <FilterButton onClick={handleApplyFilter}>
                            Apply filters
                        </FilterButton>
                        <FilterButton onClick={handleCleanFilter}>
                            Clean Filter
                        </FilterButton>
                    </ButtonContainer>
                </Modal>
            </FilterContainer>

            <SearchBar />

            {/* </SearchContainer> */}

            <UserContainer theme={theme}>
                {/* <div> */}
                <Link to="/user/shoppingCart" >
                    <FaShoppingCart />
                </Link>

                <Link to={!user ? "/login":"/commonUser/profile"}>  
                    <FaUserAlt />
                </Link>
            </UserContainer>
        </GlobalContainer>
    )
}
