import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        scrollbar-color: ${({ theme }) => theme.colors.main} ${({ theme }) =>
    theme.colors.background};

        ::-webkit-scrollbar {
            background: ${({ theme }) => theme.colors.background};
        }

        /* ::-webkit-scrollbar-button {
            display: flex;
            width: 16px;
            height: 16px;
            border-style: solid;
            color: ${({ theme }) => theme.text.highContrast};
            border-color: red;
            background-color: red;
        } */

        ::-webkit-scrollbar-thumb {
            background: ${({ theme }) => theme.colors.main};;
        }

        ::-webkit-scrollbar-corner {
            background: ${({ theme }) => theme.colors.background};;
        }
    }

    .App {
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        
        background-color: ${({ theme }) => theme.colors.background};

        & > div {
            overflow-y: auto;
            min-height: 100%;
        }
    }
`

export default GlobalStyle
