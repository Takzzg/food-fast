import styled from "styled-components"; 

export const GlobalContainer = styled.section`
    height: 100%;
    width: 100%;
    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`; 

export const TitleContainer = styled.div`
    font-family: 'Rubik Moonrocks', cursive;
    font-size: 4rem;
    height: 20%;
`;

export const IMGContainer = styled.div`
    height: 40%;
    img {
        height: 100%;
        width: auto;
    }
`;

export const DescriptionContainer = styled.div`
    height: 20%;
    font-family: "Concert One", cursive;
    font-size: 2rem;
`;

export const ButtonsContainer = styled.div`
    height: 20%;
    width: 100%;
    a {
        height: 100%;
        width: 49%;
        text-decoration: none;
    }

    div {
        width: 90%;
        height: 100%;
        cursor: pointer;
        margin: 1rem;
        color: black
    }
    #back{
        &:hover svg{
            transform: scale(1.4);
        }
        svg {
            height: 70%;
            width: auto;
        }
        outline: 3px solid green;
    }
    #order{
        font-size: 3rem;
        &:hover svg{
            transform: scale(1.4);
        }
        svg {
            margin-left: 1rem;
        }
        outline: 3px solid red;
    }
`; 