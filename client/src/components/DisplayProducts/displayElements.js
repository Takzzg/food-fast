import { Link } from "react-router-dom"
import styled from "styled-components"

export const GlobalContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.main};
`
export const FilterContainer = styled.div`
    color: ${({ theme }) => theme.text.highContrast};
    background-color: ${({ theme }) => theme.colors.bgPage};
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const CardsContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.main};
`

export const CardContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    gap: 0.5rem;
    width: 15rem;
    border: 3px solid ${({ theme }) => theme.text.highContrast};
    border-radius: 10px;
    background-color: white;
    color: ${({ theme }) => theme.text.highContrast};
    background-color: ${({ theme }) => theme.colors.background};

    &:hover {
        transform: scale(1.05);
    }
`

export const TitleDiv = styled.div`
    text-align: center;
    font-family: "Concert One", cursive;
    font-size: 1.2rem;
    text-transform: uppercase;
`

export const ImageContainer = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url(${({ img }) => img});
    background-size: cover;
    background-position: center;

    min-height: 10rem;
    border-radius: 1rem;
`

export const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 1.5rem;
    font-family: "Bangers", cursive;

    .iconBtn {
        color: ${({ theme }) => theme.text.highContrast};
        &:hover {
            transform: scale(1.2);
            color: ${({ theme }) => theme.colors.main};
        }
    }
`
