import styled from "styled-components"

export const MainContainer = styled.section` 
    margin: auto;
    width: 80%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .label {
        font-family: 'Kdam Thmor Pro', sans-serif;
    }
    .number {
        font-family: 'Domine', serif;
    }
`

export const TitleContainer = styled.div`
    font-family: 'Lobster', cursive;
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: white;
`

export const ItemsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const SubTotalContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const AditionalContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const TotalContainer = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
`

export const GoPayContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    button {
        background-color: lightgreen;
        height: 2rem;
        width: 80%;
        border: 0px;
        border-radius: 1rem;
        cursor: pointer;
        &:hover {
            outline: 4px solid white;
        }
    }
`