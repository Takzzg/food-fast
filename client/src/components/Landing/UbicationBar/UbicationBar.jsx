import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { GlobalContainer, SearchInput, SearchIcon } from "./UbicationBar.styled"
import { FaSearchLocation } from "react-icons/fa"
import { searchCategory } from "../../../redux/actions/async"
import { BsFillMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";

const SpeedRecognition=window.SpeedRecognition || window.webkitSpeechRecognition
const mic=new SpeedRecognition

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';

const CategoryBar = () => {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const [listen,setListen]=useState(false)

   
      const handleListen=()=>{
        if(listen){
          mic.start();
    
          mic.onend=()=>{
            console.log("continue...");
            mic.start();
          }
          setInput("")
    
        }else{
          mic.stop();
          mic.onend=()=>{
            console.log("micrófono en stop");
    
          }
          setInput("")
        }
        mic.onstart=()=>{
          console.log("Micrófono encendido...");
    
        }
        mic.onresult=(event)=>{
            const transcript=Array.from(event.results)
            .map((result)=>result[0])
           .map((result)=>result.transcript).join("");
           console.log(transcript)
           setInput(transcript)
           mic.onerror=(event)=>console.log(event.error)
       }
     }

     

     React.useEffect(()=>{
        handleListen();
      },[listen])

    const search = () => {
        dispatch(searchCategory(input))
    }

    const handleChange = (e) => {
        setListen(prevState=>!prevState)
        setInput(e.target.value)
        dispatch(searchCategory(e.target.value))
    }

    // const handleSubmit = () => {
    //     dispatch(searchCategory(input))
    //     alert("Búsqueda de ubicación en progreso! Devs working B)")
    // }
    const handleVoiceClick=()=>{
       
        setListen(prevState=>!prevState)
        dispatch(searchCategory(input))
        
      }
    return (
        <GlobalContainer className={"container"}>
            <SearchInput
                value={input}
                onChange={handleChange}
                name="searchBar"
                placeholder={listen?"Listening...":"Filter categories..."}
            />
              <button  onClick={handleVoiceClick}>
            {listen?<BsFillMicFill/>:<BsFillMicMuteFill/>}
              </button>
        </GlobalContainer>
    )
}

export default CategoryBar
