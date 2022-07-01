import { Link } from "react-router-dom"
import styled from "styled-components"

export const GlobalContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.main};
    max-height: 100vh;

    display: grid;
    grid-template-rows: auto 1fr;
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
    overflow-y: auto;
`
export const NotResults = styled.div`
    height: 3rem;
    font-size: 3rem;
    margin-top: 3rem;
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
        #notAvaible {
            bottom: 11rem;
        }
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

export const NotAvaible = styled.div`
    height: 2rem;
    font-size: 2rem;
    text-align: center;
    color: red; 
    font-family: 'Lobster';
`

export const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 1.5rem;
    font-family: "Bangers", cursive;
    color: ${({ theme }) => theme.text.highContrast};
    svg {
        cursor: pointer;
        &:hover {
            transform: scale(1.1);
        }
    }
    #car {
        cursor: pointer;
        &:hover {
            transform: scale(1.2);
        }
    }
    #details {
        color: ${({ theme }) => theme.text.highContrast};
        cursor: pointer;
        &:hover {
            transform: scale(1.2);
        }
    }
    .iconBtn {
        color: ${({ theme }) => theme.text.highContrast};
        &:hover {
            transform: scale(1.2);
            color: ${({ theme }) => theme.text.main};
        }
    }

    #Favorite {
        fill: yellow;
        color: black;
        background-color: black;
        cursor: pointer;
    }

    #noFavorite {
        fill: white;
        cursor: pointer;
    }
`
