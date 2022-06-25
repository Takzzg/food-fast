import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #666;
`
export const LateralDiv = styled.div`
    width: 300px;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 10px;
    border: 1px solid grey;

    .ButtonsContainer{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`
export const DisplayDiv = styled.div`
    margin: 10px;
    border: 1px solid grey;

    width: calc(100% - 250px);
    height: 90vh;
    overflow-y: scroll;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    .categories,
    .products{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-x: hidden;
        padding: 5px 3px 5px 3px;
        .addBtn {
            border-radius: 5px;
            color: ${({ theme }) => theme.text?.highContrast};
            background-color: ${({ theme }) => theme.colors?.main};

            padding: 1rem;
            text-decoration: none;
            font-size: 1.5rem;
            text-align: center;
        }
    }
`

export const StyledCard = styled.div`
    gap: 3px;
    margin 10px 0 3px 0;
    display: grid;
    grid-template-areas:
        "delete card"
        "edit   card";
    grid-template-columns: auto 1fr;

    /* max-width: 30rem; */

    & > a {
        grid-area: card;
    }

    .deleteBtn,
    .editBtn {
        border-radius: 5px;
        cursor: pointer;
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        color: ${({ theme }) => theme.text.highContrast};
        background-color: ${({ theme }) => theme.colors.background};
        font-size: 1rem;
        border: none;
        text-align: center;
        text-decoration: none;
    }
    
    .deleteBtn {
        grid-area: delete;
        &:hover {
            background-color: red;
            color: ${({ theme }) => theme.text.light};
        }
    }

    .editBtn {
        grid-area: edit;
        &:hover {
            background-color: green;
            color: ${({ theme }) => theme.text.light};
        }
    }
`