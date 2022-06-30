import styled from "styled-components"

export const GlobalContainer = styled.section`
    z-index: 2;
    text-align: center;
    color: ${({ theme }) => theme.text.highContrast};

    a {
        color: ${({ theme }) => theme.text.highContrast};
        text-decoration: none;
    }
`
export const OpenButton = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 2rem;
    height: 2.3rem;
    width: 2.3rem;

    svg {
        height: 100%;
        width: 100%;
        width: auto;
        cursor: pointer;
        padding: 3px; transition: .3s; 
        &:hover {
            transform: scale(1.2);
            box-shadow: 0 0 12px grey; border-radius: 20px;
        }
    }
`

export const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: .5rem;
    height: 2rem;
    width: 2rem;
    z-index: 2;

    svg {
        height: 100%;
        width: 100%;
        width: auto;
        cursor: pointer;
        transition .3s;
        &:hover {
            transform: scale(1.2);
            box-shadow: 0 0 12px grey; border-radius: 20px;
        }
    }
`

export const NavBarContainer = styled.section`
    background-color: ${({ theme }) => theme.colors.bgPage};
    border-right: 2px solid ${({ theme }) => theme.colors.main};

    position: absolute;
    height: 100vh;
    width: 100%;
    max-width: 20rem;
    top: 0px;

    transition: ${({ isShowing }) =>
        isShowing ? "left 0.75s ease-out" : "left 0.75s ease-in"};
    left: ${({ isShowing }) => (isShowing ? "0px" : "-100%")};
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    .navLink {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        transition: .3s;
        background-color: ${({ theme }) => theme.colors.background};

        &:hover {
            transition: .3s;
            background-color: ${({ theme }) => theme.colors.main};
            box-shadow: 0 0 17px 4px grey;
        }
    }
`
export const MainIconContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 10rem;
    z-index: 1;
    padding-top: 30px;

    svg {
        
        width: 25%;
        height: 50%;
    
        z-index: -1;
        
        color: ${({ theme }) => theme.colors.main};
    }
`

export const Title = styled.h1`
    color: ${({ theme }) => theme.text.highContrast};
    font-size: 2rem;
    

`
export const ButtonsContainer = styled.div`
    margin: 0;
    padding: 0;
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    img {
        width: 50px;
    }
    span{
        width: 110px; height: fit-content;
        margin: 2px;
        font-family: Lobster;
        font-size: 18px;
        border-bottom: 2px dotted grey;
    }
    svg{
        padding: 5px;
    }
`

export const Divider = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.main}; ;
`

export const LoginRegisterButton = styled.button`
    a {
        margin: 0; padding: 0
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        border-radius: 6px;
    }

    padding: 0;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.bgPage};
    border: 3px solid ${({ theme }) => theme.colors.main};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.main};
    &:hover {
        background-color: ${({ theme }) => theme.colors.main};
        color: ${({ theme }) => theme.text.highContrast};
    }
`

export const RouteItem = styled.li`
    /* width: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    &:hover {
        background-color: ${({ theme }) => theme.colors.main};
    }
`
/* buttons container deprecado :v
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
*/
