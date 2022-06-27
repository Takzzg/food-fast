import styled from "styled-components"; 

export const GlobalContainer = styled.section`
    display: flex;
    height: 90%;
    width: 90%;
    margin-top: 5%;
    margin-left: 5%;
`; 

export const FirstColumn = styled.section`
    height: 100%;
    width: 60%;
`;

export const FTitle = styled.div`
    height:20%;
    font-size: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lobster', cursive;
`; 
export const FGreeting = styled.div`
    height: 10%;
    font-family: 'Lobster', cursive;
    font-size: 2rem;
    text-align: center;
`;
export const FMyInformation = styled.div`
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;

`; 

export const MyForm = styled.form`
    width: 80%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
`; 
export const ItemContainer = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
`
export const LabelInput = styled.label`
    font-size: 2rem;
`
export const SimpleInput = styled.input`
    height: 2rem;
`; 

export const ButtonsForm = styled.div`
    display: flex;
    justify-content: space-around;
    height: 3rem;
    button {
        width: 30%;
        cursor: pointer;
        border-radius: 1rem;
    }
    #onEdit {
        background-color: #ffcc50;
        &:hover{
            background-color: #ff9800;
        }
    }
    #offEdit{
        background-color: red;
        &:hover{
            border: .2rem solid white;
        }
    }
    
    #save {
        background-color: greenyellow;
        &:hover {
            background-color: #228b22;
            border: .2rem solid white;

        }
    }
    #saveDisabled{
        background-color: greenyellow;

    }
`

export const SecondColumn = styled.section`
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const SImgContainer = styled.div`
    height: 30%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        height: 80%;
        width: auto;
    }
`;  
export const SOptionsContainer = styled.div`
    height: 60%;
    margin: auto;
    width: 50%;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(231, 166, 26);
    a {
        height: 10%;
        display: flex;
        align-items: center;
        width: 70%;
        border-top: .2rem solid white;
        border-bottom: .2rem solid white;
        text-decoration: none;         
        &:hover{
            border-top: .2rem solid black;
            border-bottom: .2rem solid black;
        }                       
    }
`
export const ButtonContainer = styled.div`
    width: 100%;
    height: 100%;
    font-size: 2rem;
    text-align: center;
    color: black;
`


