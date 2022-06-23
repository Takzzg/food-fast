import React, { useEffect, useState } from "react";
import Avatar from "../../assets/avatar.png";
import {Link} from "react-router-dom"; 
import {
  FGreeting,
  FirstColumn,
  FMyInformation,
  FTitle,
  GlobalContainer,
  ItemContainer,
  LabelInput,
  MyForm,
  SecondColumn,
  SimpleInput,
  ButtonsForm,
  SImgContainer,
  SOptionsContainer,
  ButtonContainer
} from "./profileElements";
import { useDispatch, useSelector } from "react-redux";
import { patchUser } from "./updateFunctions";
import { LOG_OUT } from "../../redux/actions/types";
export default function ProfileUser() {
    const [isEdit, setIsEdit] = useState(false); 

    const handleEdit = (e) =>  { e.preventDefault(); setIsEdit(true); }
    const handleNoEdit = (e) => { e.preventDefault(); setIsEdit(false); }
    const user = useSelector((state)=> state.user.authData && state.user.authData.user)
    const dispatch = useDispatch(); 

    const [form, setForm] = useState({
      name: "",
      email: "", 
      address: ""
  })

    const handleChange = (e) => {
      let {value, name} = e.target; 
      setForm({...form, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsEdit(false); 
        patchUser(user._id, form.name, form.address, dispatch)
    }
    const handleLogOut = () => {
      dispatch({type: LOG_OUT})
    }
    useEffect(() => {
      setForm({name: user.name, email: user.email, address: user.address})
  }, [])

  return (
    <GlobalContainer>
      <FirstColumn>
        <FTitle>Hi! {user.name} 👋</FTitle>
        <FGreeting>Welcome back!</FGreeting>

        <FMyInformation>
          <MyForm>
            <ItemContainer>
              <LabelInput>Name: </LabelInput>
              <SimpleInput type={"text"} value={form.name} name={"name"} readOnly={!isEdit} onChange={handleChange}/>
            </ItemContainer>

            <ItemContainer>
              <LabelInput>Address: </LabelInput>
              <SimpleInput type={"text"} value={form.address} name={"address"} readOnly={!isEdit} onChange={handleChange}/>
            </ItemContainer>

            <ItemContainer>
              <LabelInput>Email: </LabelInput>
              <SimpleInput type={"text"} readOnly value={form.email}/>
            </ItemContainer>

            <ButtonsForm>
              <button id={!isEdit ? "onEdit":"offEdit"} 
              onClick={!isEdit ? handleEdit:handleNoEdit}>
                {isEdit ? "Cancel":"Edit"}</button>
                
              <button onClick={handleSubmit} id={isEdit ? "save":"saveDisabled"} disabled={!isEdit}>Save</button>
            </ButtonsForm>
          </MyForm>
        </FMyInformation>
      </FirstColumn>
      <SecondColumn>
            <SImgContainer>
                <img src={Avatar} alt="avatar"/>
            </SImgContainer>
            <SOptionsContainer>
                <Link to={"/"}>
                    <ButtonContainer>My orders</ButtonContainer>
                </Link>
                
                <Link  to={"/"}> 
                   <ButtonContainer>Wish List</ButtonContainer>
                </Link>

                <Link  to={"/"}>
                    <ButtonContainer>My Shopcart</ButtonContainer>
                </Link>

                <Link  to={"/"}>
                   <ButtonContainer>My Reviews</ButtonContainer>
                </Link>

                <Link  to={"/login"}>
                    <ButtonContainer onClick={handleLogOut}>Log Out</ButtonContainer>
                </Link>
            </SOptionsContainer>
      </SecondColumn>
    </GlobalContainer>
  );
}
