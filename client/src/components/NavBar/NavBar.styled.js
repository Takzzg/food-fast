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
    height: 2rem;
    width: 2rem;

    svg {
        height: 100%;
        width: 100%;
        width: auto;
        cursor: pointer;
        &:hover {
            transform: scale(1.2);
        }
    }
`

export const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    height: 2rem;
    width: 2rem;
    z-index: 2;

    svg {
        height: 100%;
        width: 100%;
        width: auto;
        cursor: pointer;
        &:hover {
            transform: scale(1.2);
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
        background-color: ${({ theme }) => theme.colors.background};

        &:hover {
            background-color: ${({ theme }) => theme.colors.main};
        }
    }
`
export const MainIconContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10rem;
    z-index: 1;

    svg {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        color: ${({ theme }) => theme.colors.main};
    }
`

export const Title = styled.h1`
    color: ${({ theme }) => theme.text.highContrast};
    font-size: 3rem;
`
export const ButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
`

export const Divider = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.main}; ;
`

export const LoginRegisterButton = styled.button`
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
    }

    padding: 0.5rem;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.bgPage};
    border: 2px solid ${({ theme }) => theme.colors.main};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.main};

    &:hover {
        background-color: ${({ theme }) => theme.colors.main};
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
