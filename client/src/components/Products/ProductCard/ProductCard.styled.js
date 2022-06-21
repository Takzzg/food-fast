import { Link } from "react-router-dom"
import styled from "styled-components"

export const StyledProductCard = styled(Link)`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.text.highContrast};
    text-decoration: none;

    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
        "img header"
        "img description";

    max-width: 40rem;

    .img {
        grid-area: img;

        background-image: url(${({ img }) => img});
        background-size: cover;
        background-position: center;
    }

    .header {
        grid-area: header;

        background-color: ${({ theme }) => theme.colors.main};
        padding: 0.25rem;
        display: flex;
        justify-content: space-between;

        & > * {
            display: flex;
            align-items: center;
        }

        .name {
            font-size: 2rem;
        }
        .price {
            font-size: 1.5rem;
        }
    }

    .description {
        grid-area: description;
        padding: 0.5rem;
        color: ${({ theme }) => theme.text.soft};
    }
`
