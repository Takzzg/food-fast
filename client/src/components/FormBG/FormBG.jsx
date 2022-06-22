import styled, { keyframes } from "styled-components"
import burger from "../../assets/burger.png"
import chicken from "../../assets/chicken.png"
import pizza from "../../assets/pizza.png"

const ReboteAnimationBurger = keyframes`
    0%, 100%{
        top: 5vh
    } 50%{
        top: 2vh
    } 
`
const ReboteAnimationPizza = keyframes`
    0%, 100%{
        top: 50vh;
    } 50%{
        top: 47vh
    }
`
const ReboteAnimationChicken = keyframes`
    0%, 100%{
        top: 55vh;
    } 50%{
        top: 52vh
    } 
`

const OrnamentContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    overflow: hidden;

    img {
        height: 35vh;
        position: absolute;
    }

    #burguer {
        top: 5vh;
        left: 6vw;
        transform: rotate(-50deg);
        animation: ${ReboteAnimationBurger} 3s infinite;
    }

    #pizza {
        top: 50vh;
        left: 75vw;
        transform: rotate(-20deg);
        animation: ${ReboteAnimationPizza} 3s infinite;
    }

    #chicken {
        height: 40vh;
        top: 55vh;
        left: 8vw;
        transform: rotate(10deg);
        animation: ${ReboteAnimationChicken} 3s infinite;
    }
`

const FormBG = () => {
    return (
        <OrnamentContainer>
            <img src={burger} id="burguer" alt="burguer" />
            <img src={pizza} id="pizza" alt="pizza" />
            <img src={chicken} id="chicken" alt="chicken" />
        </OrnamentContainer>
    )
}

export default FormBG
