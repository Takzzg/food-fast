import styled from "styled-components"
export const GlobalContainer = styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;

    background-image: url(${({ bgImg }) => bgImg});
    background-position: center;
    background-size: cover;

    .ornament {
        position: absolute;
        height: 75vh;
        z-index: -1;
        top: 0;
        width: 100%;
        background: linear-gradient(#644005, #c9933e);
        clip-path: polygon(
            0% 0%,
            100% 0,
            100% 65%,
            73% 52%,
            51% 62%,
            24% 55%,
            0 65%
        );
    }

    .welcome {
        color: white;
        text-align: center;
        font-size: 70px;
        /* padding-top: 20vh; */
        z-index: 1;
        padding: 5rem 1rem;
        font-style: italic;
    }
`

export const CategoriesContainer = styled.section`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;

    a {
        text-decoration: none;
        color: black
    }
`
