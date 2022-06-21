import styled from "styled-components"; 

export const MainContainer = styled.section`
    display: flex;
    width: 100%;
    border-top: 2px solid gray;
    border-bottom: 2px solid gray;
    div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export const FirstColumn = styled.div`
    width: 35%;
    img {
        height: 5rem;
        width: auto;
    }
`

export const SecondColumn = styled.div`
    width: 35%;
    font-family: 'Acme', sans-serif;
`

export const ThirdColumn = styled.div`
    width: 10%;
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
        height: 1rem;
        width: auto;
        cursor: pointer;
        color: gray;
    }
    #remove{
        &:hover {
            color: orange;
        }
    }
    #add{
        &:hover{
            color: greenyellow
        }
    }
    #remove_all{
        &:hover{
            color: red
        }
    }
`

export const FourthColumn = styled.div`
    width: 10%;
    font-family: 'Domine', serif;
`

export const FifthColumn = styled.div`
    width: 10%;
    font-family: 'Domine', serif;

`

