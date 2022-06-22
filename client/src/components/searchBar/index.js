import React, { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { GlobalContainer, SearchIcon, SearchInput } from "./searchElements"
import { useDispatch, useSelector } from "react-redux"
import { searchProduct } from "../../redux/actions/async"
import { BsFillMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";

const SpeedRecognition=window.SpeedRecognition || window.webkitSpeechRecognition
const mic=new SpeedRecognition()

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';


export default function SearchBar() {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.selectedTheme)
    const [listen,setListen]=useState(false)

   
      const handleListen=()=>{
        if(listen){
          mic.start();
    
          mic.onend=()=>{
            console.log("continue...");
            mic.start();
          }
    
    
        }else{
          mic.stop();
          mic.onend=()=>{
            console.log("Se le paró el micrófono");
    
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

      const handleVoiceClick=()=>{
        dispatch(searchProduct(input))
        setListen(prevState=>!prevState)
        
      }
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
                placeholder={listen?"Listening...":"Search..."}
            />
              <button onClick={handleVoiceClick}>
            {listen?<BsFillMicFill/>:<BsFillMicMuteFill/>}
              </button>
        </GlobalContainer>
    )
}
