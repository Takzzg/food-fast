import styled from "styled-components"

export const StyledCategoryDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    .banner {
        width: 100%;
        height: 20%;
        padding-left: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.text.light};
        font-size: 2rem;
        #name {
            display: flex;
            justify-content: space-between;
            color: black;
            width: 30%;
            text-transform: uppercase;
        }
        #description {
            width: 50%;
            color: #c9933e;
        }
    }

    .products {
        height: 80%;
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: auto;
        align-items: center;
        /* align-items: center; */
        background-image: url(${({ img }) => img});
        background-size: contain;
        gap: 0.25rem;
    
    }
`
