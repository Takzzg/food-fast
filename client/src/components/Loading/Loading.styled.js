import styled from "styled-components"

export const StyledLoadingComponent = styled.div`
    background-color: ${({ bg }) => bg};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    padding: 2rem;

    .animation {
        margin: -2rem;
    }

    .text {
        font-size: 2rem;
        color: ${({ theme }) => theme.text.highContrast};
    }
`
