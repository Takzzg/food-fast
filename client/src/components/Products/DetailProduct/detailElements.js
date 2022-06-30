import styled from "styled-components"
import { Link } from "react-router-dom"
export const GlobalContainer = styled.div`
    height: 100vh;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.bgPage};
    .reviewsTitle {
        font-family: 'Lobster';
        text-align: center;
        font-size: 3rem;
        color: ${({ theme }) => theme.text.highContrast};
    }
`

export const ProductHeader = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    color: ${({ theme }) => theme.text.highContrast};
    background-color: ${({ theme }) => theme.colors.main};

    .score {
        font-size: 1.5rem;
    }
`

export const ReviewsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    gap: 1rem;
    padding: 2rem;

    .reviewsTitle {
        grid-area: title;
        text-align: center;
        font-size: 2rem;
        color: ${({ theme }) => theme.text.highContrast};
    }

    #noForm{
        background-color: ${({theme})=>theme.colors.background};
        width: 450px; height: 200px;
        display: flex;
        justify-content: center; align-items: center;
        margin-top: 20px;
        border-radius: 12px; 
        border: 2px solid grey;
        padding: 6px;
        box-shadow: 5px 5px 10px ${({theme})=>theme.text.highContrast};
        p{
            color: ${({theme})=>theme.text.highContrast};
            font-family: 'Lobster';
            font-size: 25px;
            border-bottom: 2px dashed grey;
        }
    }
    

    form {
        grid-area: form;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto;
        align-items: center;
        justify-content: center;
        position: sticky;
        top: 6rem;
        color: ${({ theme }) => theme.text.highContrast};
        background-color: ${({ theme }) => theme.colors.main};
        padding: 1rem;
        gap: 1rem;

        .formTitle {
            grid-column: span 2;
            text-align: center;
            font-size: 1.5rem;
        }
    }

    .reviews {
        
        padding: 10px;
        grid-area: reviews;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .radioCont {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .submit {
        grid-column: span 2;
    }
`

export const TitleContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Concert One", cursive;
    font-size: 3.5rem;
`
export const StoreName = styled.div`
    background-color: black;
    color: wheat;
    height: 1.5rem;
    width: 8rem;
    font-size: 0.8rem;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Bangers", cursive;
    font-size: 1rem;
`
export const MainContainer = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const SecondMainContainer = styled.div`
    min-height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 31.5rem;
`
export const NotAvailable = styled.div`
    color: red;
    font-size: 3rem;
`
export const ImageContainer = styled.section`
    display: flex;
    align-items: center;
    height: 25rem;
    width: 25rem;
    max-width: 32rem;
    img {
        border-radius: 30px;
        height: auto;
        width: 100%;
    }
`

export const DescriptionContainer = styled.section`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.text.highContrast};
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
`

export const ListItem = styled.div`
    width: 90%;
    margin: 1rem;
`
export const Etiqueta = styled.div`
    font-family: "Righteous", cursive;
    font-weight: lighter;
`
export const Data = styled.div`
    font-family: "Acme", sans-serif;
`
export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 30rem;
    margin-top: 1.5rem;
    div {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        margin: 1rem;
        border-radius: 1rem;
        cursor: pointer;
        svg {
            height: 100%;
            width: auto;
            color: ${({ theme }) => theme.colors.main};
        }
        &:hover {
            background-color: ${({ theme }) => theme.colors.main};
            svg {
                color: white;
            }
        }
    }
`
export const CarShop = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
`
export const BuyButton = styled(Link)`
    background-color: ${({ theme }) => theme.colors.background};
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.main};
    svg {
        height: 100%;
        width: auto;
        color: ${({ theme }) => theme.colors.main};
    }
    &:hover {
            background-color: ${({ theme }) => theme.colors.main};
            svg {
                color: white;
            }
        }

`
/* font-family: 'Fredoka One', cursive; */
/* font-family: 'Righteous', cursive; */
