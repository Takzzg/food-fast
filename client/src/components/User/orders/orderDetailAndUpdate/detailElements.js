import styled from "styled-components"; 
export const GlobalContainer = styled.section`
    height: 100%;
    width: 100%;
`

export const DetailsOrder = styled.section`
    display: flex;
    margin-top: 1rem;
    flex-direction: column;
    height: 30%;
`
export const FirstRow = styled.div`
    display: flex;
    justify-content: space-around;
`
export const SecondRow = styled.div`
    display: flex;
    justify-content: space-around;
`
export const OrderCell = styled.div`
    padding: 1rem;
    text-align: center;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
        cursor: pointer;
        &:hover {
            color: orange
        }
    }
     &:before {
        margin-bottom: 3px;
        content: attr(data-title);
        min-width: 98px;
        font-size: 10px;
        line-height: 10px;
        font-weight: bold;
        text-transform: uppercase;
        color: red;
        display: block;

    }
    #confirm {
        &:hover {
            color: green;
        }
    }
    #cancel {
        &:hover {
            color: red;
        }
    }
`
export const HandleDelete = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    position: relative;
    right: 2rem;
    svg {
        height: 3rem;
        cursor: pointer;
        width: auto;
        &:hover {
            color: red;
        }
    }
`
export const UserCell = styled.div`
    padding: 1rem;
    font-size: 1.5rem;
    text-align: center;
    &:before {
        margin-bottom: 3px;
        content: attr(data-title);
        min-width: 98px;
        font-size: 10px;
        line-height: 10px;
        font-weight: bold;
        text-transform: uppercase;
        color: blue;
        display: block;

    }
`

export const DetailsProducts = styled.section`
    background-color: aliceblue;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
`