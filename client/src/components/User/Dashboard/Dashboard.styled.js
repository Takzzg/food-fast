import styled from "styled-components"

export const StyledDashboard = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.bgPage};

    .title {
        min-height: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.text.highContrast};
        background-color: ${({ theme }) => theme.colors.main};
    }

    .content {
        display: grid;
        justify-content: center;
        grid-template-columns: auto auto;
        gap: 1rem;
        padding: 1rem;
        overflow: hidden;

        & > div {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            overflow-x: hidden;

            & > .addBtn {
                color: ${({ theme }) => theme.text.highContrast};
                background-color: ${({ theme }) => theme.colors.main};

                padding: 1rem;
                text-decoration: none;
                font-size: 1.5rem;
                text-align: center;
            }

            & > div {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                /* align-items: center; */
                /* justify-content: stretch; */
                overflow-y: auto;
                overflow-x: hidden;
            }
        }
    }
`
export const StyledCard = styled.div`
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
