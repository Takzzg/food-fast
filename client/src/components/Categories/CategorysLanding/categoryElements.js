import styled from "styled-components"

export const MainContainer = styled.section`
    
    border-radius: 10px;
    margin: 1rem;
    height: 10rem;
    width: 20rem;
    background-color: ${({ bgColor }) => bgColor};
    padding: 0.5rem;
    gap: 0.5rem;
    display: grid;
    grid-template-columns: 2fr 3fr;
    align-items: center;
    justify-content: end;
    transition: transform 0.1s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 5px 4px 10px ${({theme})=>theme.text.highContrast};
    }
`

export const ImageCategory = styled.div`
    background-image: url(${({ image }) => image});
    height: 100%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`

export const NameCategory = styled.span`
    font-size: 30px;
    color: white;
    text-transform: uppercase;

`

