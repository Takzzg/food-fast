import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { GlobalContainer, SearchInput, SearchIcon } from "./UbicationBar.styled"

import { searchCategory } from "../../../redux/actions/async"
import { BsFillMicFill } from "react-icons/bs"
import { BsFillMicMuteFill } from "react-icons/bs"
import style from "./style/microspeech.module.scss"

const SpeechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition
const mic = SpeechRecognition ? new SpeechRecognition() : null

if (mic) {
    mic.continuous = true
    mic.interimResults = true
    mic.lang = "es-ES"
}

const CategoryBar = () => {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const [listen, setListen] = useState(false)

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

    useEffect(() => {
        handleListen()
    }, [listen])

    const handleVoiceClick = () => {
        dispatch(searchCategory(input))
        setListen((prevState) => !prevState)
    }
    // const search = () => {
    //     dispatch(searchCategory(input))
    // }

    const handleChange = (e) => {
        setInput(e.target.value)
        dispatch(searchCategory(e.target.value))
    }

    return (
        <GlobalContainer className={"container"}>
            <SearchInput
                value={input}
                onChange={handleChange}
                name="searchBar"
                placeholder={listen ? "Escuchando..." : "Filtrar cetegorías..."}
            />
            {mic && (
                <button className={style.mic_speech} onClick={handleVoiceClick}>
                    {listen ? <BsFillMicFill /> : <BsFillMicMuteFill />}
                </button>
            )}
        </GlobalContainer>
    )
}

export default CategoryBar
