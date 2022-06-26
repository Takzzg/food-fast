import styled from "styled-components"; 

export const GlobalContainer = styled.section`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const TitleContainer = styled.section`
    height: 20%;
    font-size: 3rem;
    font-family: 'Lobster';
    padding-left: 8rem;
    padding-top: 1rem;
`

export const CardsContainer = styled.section`
    display: flex;
    overflow: auto;
    flex-wrap: wrap;
    justify-content: center;
    position: relative; // Esta linea soluciono todo XD
`

