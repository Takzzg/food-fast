import styled, { keyframes } from "styled-components"

export const GlobalContainer = styled.section`
    z-index: 1;
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(
        45deg,
        hsl(0deg 0% 58%) 0%,
        hsl(344deg 0% 51%) 11%,
        hsl(344deg 0% 44%) 22%,
        hsl(344deg 0% 38%) 33%,
        hsl(344deg 0% 31%) 44%,
        hsl(344deg 0% 25%) 56%,
        hsl(344deg 0% 19%) 67%,
        hsl(344deg 0% 14%) 78%,
        hsl(343deg 0% 8%) 89%,
        hsl(0deg 0% 0%) 100%
    );
    display: flex;
    flex-direction: column;
    /* overflow: hidden; */
`
export const Title = styled.div`
    width: 100%;
    text-align: center;
    position: absolute;
    top: 1rem;
    color: white;
    font-size: 3rem;
`
export const MainContainer = styled.section`
    height: 30rem;
    width: 50rem;
    z-index: 2;
    margin: auto;
    background: rgba(201, 147, 62, 0.19);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.9px);
    -webkit-backdrop-filter: blur(4.9px);
    border: 1px solid rgba(201, 147, 62, 0.3);
    border-radius: 10px;
    display: flex;
`

export const MessageContainer = styled.div`
    left: 25%;
    position: absolute;
    color: white;
    width: 50%;
    display: flex;
    justify-content: center;
    background-color: ${({ color }) => color};
    text-align: center;
`
export const PrevContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 40%;
    margin: auto;
    margin-top: 0.2rem;
    button {
        height: 5%;
        width: 1rem;
        background-color: red;
        color: white;
        border: 0px;
        cursor: pointer;
        &:hover {
            background-color: white;
            color: red;
        }
    }
`

export const PrevEmptyImgContainer = styled.div`
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.8rem;
    width: 100%;
    height: 7rem;
    border: 2px dashed #ffff00;
    color: #ffff00;
`
export const PrevImgContainer = styled.div`
    overflow: hidden;
    display: flex;
    margin: auto;
    margin-top: 0.8rem;
    width: 70%;
    color: white;
    justify-content: center;
    text-align: center;
    height: 7rem;
    width: max-content;
    -webkit-box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 7px 0px 0px rgba(0, 0, 0, 0.75);
    img {
        height: 100%;
        width: auto;
        transition: 1s transform;
        cursor: pointer;
    }
    &:hover img {
        -webkit-transform: scale(1.3);
        transform: scale(1.3);
    }
`

export const FirstColumnContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .rowForm {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        #priceContainer {
            display: flex;
            align-items: center;
            margin-left: 4rem;
            #price {
                font-size: 1.5rem;
                width: 50%;
            }
        }
        span {
            font-size: 1.5rem;
            margin-right: 0px;
            padding-right: 0px;
        }
    }
`
export const SecondColumnContainer = styled.div`
    width: 50%;
    height: 100%;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 30px;
    margin-bottom: 0px;
    width: 80%;

    input {
        border-radius: 0.4rem;
        background-color: ${({ color }) => color};
        color: wheat;
        padding-left: 1rem;
        font-size: 1rem;
        font-family: "Kanit", sans-serif;
        &::placeholder {
            color: wheat;
            font-size: 1rem;
            font-family: "Kanit", sans-serif;
        }
    }

    #number {
        width: 40%;
        margin: 1rem;
    }
    #addTag {
        width: 50%;
        margin: auto;
        margin-top: 0.5rem;
        background-color: #ff5b00;
        color: wheat;
        cursor: pointer;
        &:hover {
            background-color: #990000;
        }
    }
`
export const Label = styled.label`
    color: white;
    font-family: "Satisfy", cursive;
    font-size: 30px;
`

export const InputSimple = styled.input`
    height: 2rem;
`

export const AvailableContainer = styled.div`
    background-color: ${(props) => (props.isAvailable ? "green" : "red")};
    color: white;
    height: 2rem;
    width: 60%;
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 10px;
    justify-content: center;
    transition: background 0.5s;
`

export const InputTextArea = styled.textarea`
    resize: none;
    height: 3rem;
    border-radius: 0.4rem;
    background-color: ${({ color }) => color};
    color: wheat;
    padding: 0.6rem;
    font-size: 1rem;
    font-family: "Kanit", sans-serif;
    &::placeholder {
        color: wheat;
        font-size: 1rem;
        font-family: "Kanit", sans-serif;
    }
`
export const InputFiled = styled.input`
    color: white;
    cursor: pointer;
`

export const ErrorMsg = styled.div`
    background-color: #ff1000;
    color: white;
    height: ${(props) => (props.error ? "1.3rem" : "0")};
    transition: height 0.5s;
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`
export const TagsProduct = styled.div`
    background-color: transparent;
    border: 2px solid ${({ color }) => color};
    border-radius: 1rem;
    margin: auto;
    color: white;
    margin-top: 10px;
    min-height: 3rem;
    height: 10vh;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1.3rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        -webkit-appearance: none;
    }

    &::-webkit-scrollbar:vertical {
        width: 10px;
    }

    &::-webkit-scrollbar-button:increment,
    .contenedor::-webkit-scrollbar-button {
        display: none;
    }

    &::-webkit-scrollbar:horizontal {
        height: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #797979;
        border-radius: 20px;
        border: 2px solid #f1f2f3;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }
`

export const TagCard = styled.div`
    background-color: ${({ color }) => color};
    margin: 0.4rem;
    height: 1.5rem;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 45%;

    #tag {
        width: 70%;
    }
    #deleteButton {
        right: 0px;
        height: 1rem;
        width: 1rem;
        color: #f58220;
        background-color: black;
        cursor: pointer;
        &:hover {
            color: black;
            background-color: #f58220;
        }
    }
`

const ReboteAnimationBurger = keyframes`
    0%{
        top: 5vh
    } 50%{
        top: 2vh
    } 100%{
        top: 5vh
    }
`
const ReboteAnimationPizza = keyframes`
0%{
    top: 50vh;
} 50%{
    top: 47vh
} 100%{
    top: 50vh
}
`
const ReboteAnimationChicken = keyframes`
0%{
    top: 55vh;
} 50%{
    top: 52vh
} 100%{
    top: 55vh
}
`

export const OrnamentContainer = styled.div`
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
export const ButtonCreate = styled.button`
    background-color: ${({ color }) => color};
    width: 50%;
    z-index: 3;
    height: ${(props) => (props.isAvailable ? "2rem" : "0px")};
    color: ${(props) => (props.isAvailable ? "black" : "transparent")};
    transition: height 1s;
    position: absolute;
    top: 100%;
    left: 25%;
    cursor: ${(props) => (props.isAvailable ? "pointer" : "normal")};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    &:hover {
        color: ${(props) => (props.isAvailable ? "orange" : "transparent")};
        background-color: black;
    }
`
export const ButtonCreate2 = styled.button`
    background-color: ${({ color }) => color};
    width: 50%;
    z-index: 3;
    height: ${(props) => (props.isAvailable ? "2rem" : "0px")};
    color: ${(props) => (props.isAvailable ? "black" : "transparent")};
    transition: height 1s;
    position: absolute;
    top: 88%;
    left: 25%;
    cursor: ${(props) => (props.isAvailable ? "pointer" : "normal")};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    &:hover {
        color: ${(props) => (props.isAvailable ? "orange" : "transparent")};
        background-color: black;
    }
`