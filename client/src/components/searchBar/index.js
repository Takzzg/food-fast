import React, { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { GlobalContainer, SearchIcon } from "./searchElements"
import { useDispatch, useSelector } from "react-redux"
import { searchProductSync } from "../../redux/actions/sync"
import { searchProductAsync } from "../../redux/actions/async"
import Autosuggest from "react-autosuggest"
import { BsFillMicFill } from "react-icons/bs"
import { BsFillMicMuteFill } from "react-icons/bs"
import style from "./style/speechRecog.module.scss"
import "./autoStyles.scss"
import axios from "axios"
import { AiOutlineReload } from "react-icons/ai"

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
const mic = SpeechRecognition ? new SpeechRecognition() : null

export default function SearchBar() {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)
    const [listen, setListen] = useState(false)
    const productsF = useSelector((state) => state.main.products.filtered)
    const allProducts = useSelector((state) => state.main.products.all)
    const [products, setProducts] = useState(productsF ? productsF : [])

    useEffect(() => {
        handleListen()
    }, [listen])

    const handleVoiceClick = () => {
        dispatch(searchProductSync(input))
        setListen((prevState) => !prevState)
    }
    const handleListen = () => {
        if (!mic) return
        if (listen) {
            mic.start()

            mic.onend = () => {
                console.log("continue...")
                mic.start()
            }
        } else {
            mic.stop()
            mic.onend = () => {
                console.log("micrófono en stop")
            }
            setInput("")
        }
        mic.onstart = () => {
            console.log("Micrófono encendido...")
        }
        mic.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("")
            console.log(transcript)
            setInput(transcript)
            mic.onerror = (event) => console.log(event.error)
        }
    }
    // ==================================

    const renderSuggestion = (suggestion) => (
        <div onClick={() => handleSelect(suggestion.name)}>
            {`${suggestion.name}`}
        </div>
    )

    const onSuggestionsClearRequested = () => setProducts(allProducts)

    const onSuggestionsFetchRequested = ({ value }) =>
        setProducts(filterProducts(value))
    const getSuggestionValue = (suggestion) => `${suggestion.name}`

    const handleSelect = (product) => {
        setInput("")
        dispatch(searchProductAsync(product))
    }

    const filterProducts = (value) => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length

        let filteredProducts = allProducts.filter((product) => {
            let completeName = product.name
            if (
                completeName
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .includes(inputValue)
            ) {
                return product
            }
        })

        return inputLength === 0 ? [] : filteredProducts
    }

    const getData = () => {
        axios
            .get(`${process.env.REACT_APP_BACK_URL}/api/v1/products`)
            .then((response) => {
                setProducts(response.data)
            })
    }
    // ================================
    const handleChange = (e) => {
        setInput(e.target.value)
        dispatch(searchProductSync(e.target.value))
    }

    const handleClean = () => {
        dispatch(searchProductSync(""))
    }
    const inputProps = {
        placeholder: listen ? "Listening..." : "Product name",
        value: input,
        onChange: handleChange
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <GlobalContainer>
            {mic && (
                <button className={style.microno} onClick={handleVoiceClick}>
                    {listen ? <BsFillMicFill /> : <BsFillMicMuteFill />}
                </button>
            )}
            <Autosuggest
                suggestions={products}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={() => setInput("")}
            />

            <button className={style.clean_product} onClick={handleClean}>
                <AiOutlineReload />
            </button>
        </GlobalContainer>
    )
}
