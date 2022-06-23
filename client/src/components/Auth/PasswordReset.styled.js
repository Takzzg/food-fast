import styled from "styled-components";

export const Container = styled.div`
margin: 0; padding: 0;
background-image: url("https://thumbs.dreamstime.com/b/greek-food-background-traditional-different-greek-dishes-set-greek-food-background-traditional-different-greek-dishes-set-top-view-178761927.jpg");
background-size: cover;
width: 100%;
height: 100vw;
font-family: sans-serif;
` 
export const ResetDivBox = styled.div`
width: 320px;
height: fit-content;
background: rgb(85, 49, 3);
color: #fff;
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%, -50%);
box-sizing: border-box;
border-radius: 5px;
padding: 55px 30px;
box-shadow: 6px 6px 6px #111;
svg{
    width: 90px; height: 90px;
    position: absolute;
    top: -50px;
    left: calc(50% - 50px);
    background-color: rgb(206, 151, 80); color: #000;
    border-radius: 50%;
    padding: 5px;
    border: 0px;
}
h1{
    margin: 4px;
    padding: 6px 0 20px;
    text-align: center;
    font-size: 24px;
}
label{
    margin: 0; padding: 0;
    font-weight: bold;
    display: block;
}
input{
    width: 100%;
    margin-bottom: 22px;
}
input[type="text"]{
    color: #ddd;
    border: 0;
    border-bottom: 1px solid white;
    background: transparent;
    outline: none;
    height: 37px;
    font-size: 16px;
} 
input[type="submit"], input[type="button"]{
    color: #000;
    border: 0;
    outline: none;
    background: rgb(206, 151, 80);
    height: 35px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 20px;
    margin: 10px 0 10px;
    transition: box-shadow .3s ease;
    transition: .3s;
    &:hover{
        background: #000;
        color: #ede;
        box-shadow: 0 0 6px #fff;
    }
}

}
`
