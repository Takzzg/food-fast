import styled from "styled-components"

export const GlobalContainer = styled.section`
    width: 100%;
    height: 100%;
`

export const TitleMainContainer = styled.section`
    font-size: 3rem;
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
`

export const TablesContainer = styled.section`
    height: 90%;
    display: flex;
`

export const ShopContainer = styled.div`
    width: 60%;
    display: flex;
    overflow-y: auto;
    div {
        margin: auto;
        margin-right: 0;
        width: 90%;
        background-color: white;
        border-radius: 1rem;
        div {
            width: 100%;
        }
    }
`

export const Header = styled.div`
    display: flex;
    width: 100%;

    div {
        text-align: center;
    }
    #product {
        width: 40%;
    }
    #quantity {
        width: 20%;
    }
    #price {
        width: 20%;
    }
    #total {
        width: 20%;
    }
`
export const Footer = styled.div``

export const OrderContainer = styled.div`
    width: 40%;
    display: flex;
`

export const OrderRealContainer = styled.div`
    width: 60%;
    height: 80%;
    margin: auto;
    border-radius: 3rem;
    background-color: gray;
    display: flex;
`
