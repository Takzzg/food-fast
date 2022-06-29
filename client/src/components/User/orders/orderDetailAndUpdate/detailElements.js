import styled from "styled-components"; 
export const GlobalContainer = styled.section`
    height: 100%;
    width: 100%;
`

export const DetailsOrder = styled.section`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    width: 100%;
    p{
        font-size: 30px;
        font-family: 'Lobster';
    }
`
export const FirstRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 0 20px 0; 
    border-bottom: 2px solid grey;
    
`
export const SecondRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 10px 0 10px 0;
`
export const OrderCell = styled.div`
    padding: 1rem;
    text-align: center;
    font-size: 17px;
    font-family: 'Lucida Sans';
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
        margin-left: 10px;
        width: 30px; height: 30px;
        cursor: pointer;
        transition: .3s; padding: 2px;
        &:hover {
            transition: .3s;
            color: orange;
            border-radius: 25px;
            box-shadow: 0 0 17px 4px white;
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
export const UserCell = styled.div`
    padding: 1rem;
    font-size: 16px;
    font-family: 'Lucida Sans';
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

export const HandleDelete = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    position: relative;
    right: 2rem;
    transition: .3s;
    svg {
        transition: .3s;
        height: 3rem;
        cursor: pointer;
        width: auto;
        &:hover {
            box-shadow: 0 0 10px; border-radius: 25px;
            color: red;
        }
    }
    span{
        margin-right: 30px;
        font-size: 20px; font-weight: bold;
    }
`

export const DetailsProducts = styled.section`
    margin-top: 15px;
    background-color: aliceblue;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
`