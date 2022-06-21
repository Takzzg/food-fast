import styled from "styled-components"

export const CreateButton = styled.button`
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ color }) => color};
    color: white;
    margin-top: 3rem;
    border-radius: 1rem;
    height: 2rem;
    width: 8rem;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: orange;
    }

    &:disabled {
        background-color: red;
    }
`

export const ImgMessageContainer = styled.div`
    background-color: green;
    text-align: center;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
`

export const PrevContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 40%;
    margin: auto;
    margin-top: 1rem;
    button {
        height: 15%;
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
