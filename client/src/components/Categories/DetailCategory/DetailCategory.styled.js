import styled from "styled-components"

export const StyledCategoryDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    .banner {
        width: 100%;
        height: 30%;
        background-image: url(${({ img }) => img});
        background-position: center;
         background-size: contain; 
        background-repeat: no-repeat;

        display: flex;
        align-items: center;
        justify-content: center;

        color: ${({ theme }) => theme.text.light};
        font-size: 3rem;
    }

    .products {
        height: 70%;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        gap: 0.25rem;
    
    }
`
