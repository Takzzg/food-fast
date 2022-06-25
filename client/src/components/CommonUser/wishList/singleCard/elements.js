import styled from "styled-components"

export const CardContainer = styled.section`
    height: 13rem;
    width: 25%;
    margin: 1rem;
`

export const Imagen = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    background-size: cover;
    background-image: ${({img})=> img && `url(${img})`};
    outline: 2px solid black;
    svg {
        height: 2rem;
        color: white;
        width: auto;
        position: absolute;
        &:hover {
            color: red;
        }
    }
    &:hover div#info {
        opacity:1;
    }

    &:hover p#headline {
        margin-left: 25%;
    }
    
    &:hover p#description {
        margin-top: 6rem;
    }
`

export const Info = styled.div`
    position:absolute;
    width: 25%;
    height: 13rem;
    background-color: rgba(31, 31, 31, 0.9);
    opacity:0;
    transition: opacity 0.3s;
    color: white;
    p#headline{
        position: absolute;
        font-size: 1.5rem;
        margin-left: -75px;
        text-align: center;
        margin-top: 15px;
        transition: margin-left 0.3s;
    }
    p#description{
        font-size: 1rem;
        text-align: center;
        margin-top: 200px;
        transition: margin-top 0.4s;
    }
`



  