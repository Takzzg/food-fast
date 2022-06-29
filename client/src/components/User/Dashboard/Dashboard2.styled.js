import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-image: url("https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=968&q=80");
    background-size: cover;
    width: 100%;
    height: 100vw;
    
`
export const LateralDiv = styled.div`
    width: 300px;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 10px;
    border: 2px solid grey;
    backdrop-filter: blur(6px);
    .ButtonsContainer{
        display: flex;
        flex-direction: column;
        gap: 30px;

        .menuBtn{
            color: #222;
            border: 0;
            outline: none;
            background: rgb(206, 151, 80);
            height: 24px;
            width: 100%;
            font-size: 14px;
            font-family: 'Lucida Sans';
            cursor:pointer;
            padding: 5px;
            transition: box-shadow .3s ease;
            transition: .3s;
            &:hover{
                background: #222;
                color: #ede;
                box-shadow: 0 3px 10px #000;
            }
        }
    }

    .user_section{
        padding-left: 20px;
        display: grid; gap: 11px;
        font-size: 22px;
        .userCircle,
        .google_photo{
            margin: 10px 0 5px 0;
            width: 4.5rem; height: 4.5rem;
            box-shadow: 0 0 9px 4px green;
            border-radius: 75px;
        }
        p{
            margin: 10px 0 10px 0;
        }
    }
`
export const DisplayDiv = styled.div`
    margin: 10px;
    border: 2px solid grey;

    backdrop-filter: blur(6px);

    width: calc(100% - 250px);
    height: 90vh;
    overflow-y: scroll;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    .categories,
    .users,
    .products{
        width: 750px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-x: hidden;
        padding: 5px 10px 5px 10px;
        .addBtn {
            border-radius: 5px;
            color: ${({ theme }) => theme.text?.highContrast};
            background-color: ${({ theme }) => theme.colors?.main};

            padding: 1rem;
            text-decoration: none;
            font-size: 1.5rem;
            text-align: center;
        }
    }
    .cabezal{
        font-family: 'Lobster';
        font-size: 40px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
    }
    #orders {
        width: 100%;
    }
`
export const InfoDiv = styled.div`
    width: 100%;
    display: flex; flex-direction: row;
    justify-content: space-around;
    padding-top: 30px;
    svg{
        width: 50px; height: 50px;
        box-shadow: 0 0 10px black;
        border-radius: 25px;
    }
    .infoCard{
        border: 3px solid grey;
        border-radius: 7px;
        width: 250px; height: 170px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        box-shadow: 6px 5px 10px black;
    }
    .infoTitle{
        color: #333;
        font-family: 'Lucida Sans';
    }
    .info{
        font-size: 26px;
        color: #555;
        font-weight: bold;
    }
`

export const StyledCard = styled.div`
    gap: 3px;
    margin 10px 0 3px 0;
    display: grid;
    grid-template-areas:
        "delete card"
        "edit   card";
    grid-template-columns: auto 1fr;

    /* max-width: 30rem; */

    & > a {
        grid-area: card;
    }

    .deleteBtn,
    .editBtn {
        border-radius: 5px;
        cursor: pointer;
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        color: ${({ theme }) => theme.text.highContrast};
        background-color: ${({ theme }) => theme.colors.background};
        font-size: 1rem;
        border: none;
        text-align: center;
        text-decoration: none;
        transition: .3s;
    }
    
    .deleteBtn {
        grid-area: delete;
        &:hover {
            background-color: red;
            color: ${({ theme }) => theme.text.light};
            box-shadow: 0 0 12px red;
        }
    }

    .editBtn {
        grid-area: edit;
        &:hover {
            background-color: green;
            color: ${({ theme }) => theme.text.light};
            box-shadow: 0 0 12px green;
        }
    }
`

export const UserDiv = styled.div`
    width: calc(100% - 40px);

    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 2px;
    padding-top: 35px;
    position: relative;

    .userCard{
        font-family: Franklin Gothic medium;
        font-size: 17px;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
        border-bottom: 2px solid #fff;

        .userCircle{
            width: 3rem; height: 3rem;
        }

        .buttonIcon{
            width: 22px; height: 22px;
        }

        .deleteBtn{
            gap: 5px;
            border-radius: 6px;
            cursor: pointer;
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            justify-content: center;
            padding: .5rem;
            color: ${({ theme }) => theme.text.highContrast};
            background-color: ${({ theme }) => theme.colors.background};
            font-size: 1rem;
            border: none;
            text-align: center;
            text-decoration: none;
            grid-area: delete;
            transition: box-shadow .3s ease;
            transition: .3s;
            &:hover {
                background-color: red;
                color: ${({ theme }) => theme.text.light};
                box-shadow: 0 0 12px red;
            }
        }
        
        .roleBtn{
            color: #000;
            border: 0;
            outline: none;
            background: rgb(206, 151, 80);
            height: fit-content;
            width: 130px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 4px;
            cursor:pointer;
            padding: 5px;
            transition: box-shadow .3s ease;
            transition: .3s;
            &:hover{
                background: #000;
                color: #ede;
                box-shadow: 0 3px 10px #000;
            }
        }

        .google_photo{
            border-radius: 20px;
            width: 3rem;
        }
    }
    span{
        width: 160px;
        display: flex; justify-content: center;
    }
`