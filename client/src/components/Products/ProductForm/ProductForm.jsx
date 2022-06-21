import React, { useState } from "react"
import {
  GlobalContainer,
  InputContainer,
  Label,
  InputSimple,
  InputTextArea,
  InputFiled,
  MainContainer,
  FirstColumnContainer,
  SecondColumnContainer,
  OrnamentContainer,
  TagsProduct,
  TagCard,
  AvailableContainer,
  ErrorMsg,
  ButtonCreate,
  PrevContainer,
  PrevImgContainer,
  PrevEmptyImgContainer,
  Title
} from "./formElements";
import useForm from "../../CustomHooks/useForm";
import SelectedList from "./selectedList";
import {CgUnavailable} from "react-icons/cg"
import {MdOutlineEventAvailable} from "react-icons/md"


const initialForm = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categories: [],
    img: ""
}

export default function ProductForm() {
  // Usando el hook personalizado
  const [file, setFile] = useState(null);
  const [imgCharge, setImgCharge] = useState(false); 
  const { form, handleChange, isSend, errors, setForm,  isAvailable, handleSubmit, isEmpty } = useForm("product", initialForm, setImgCharge);

  const handleChangeFile = (e)=> {
    const newFile = e.target.files[0]; 
    setFile(newFile)
    if(newFile)  setImgCharge(true)
    else setImgCharge(false)
  }

  const handleDeleteCategory = (value)=> {
    setForm({...form, categories: form.categories.filter(el=> el !== value)})
  }

  const handleDeletePrev = () => {
    document.getElementById("fileinput").value = null; 
    setFile(null)
  }
  
  return (
  <GlobalContainer>
    <OrnamentContainer>
      <img src={require("../../../assets/burger.png")}  id="burguer" alt="burguer"/>
      <img src={require("../../../assets/pizza.png")}   id="pizza" alt="pizza"/>
      <img src={require("../../../assets/chicken.png")} id="chicken"alt="chicken"/>
    </OrnamentContainer>

      
    <Title>CREATE PRODUCT</Title>
            <MainContainer>
                <FirstColumnContainer>
                    <InputContainer color={"rgba(201, 147, 62)"}>
                        <Label>Name:</Label>
                        <InputSimple
                            type={"text"}
                            placeholder="Pizza..."
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {
                            <ErrorMsg error={errors.name ? true : false}>
                                {errors.name}
                            </ErrorMsg>
                        }
                    </InputContainer>

                    <InputContainer color={"rgba(201, 147, 62)"}>
                        <Label>Description:</Label>
                        <InputTextArea
                        color={"rgba(201, 147, 62)"}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                        {
                            <ErrorMsg error={errors.description ? true : false}>
                                {errors.description}
                            </ErrorMsg>
                        }
                    </InputContainer>

                    <InputContainer className="row" color={"rgba(201, 147, 62)"}>
                        <Label>Price:</Label>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <div id="priceContainer">
                                <span>$/.</span>
                                <InputSimple
                                    type={"number"}
                                    min="0"
                                    name="price"
                                    id="price"
                                    value={form.price}
                                    onChange={handleChange}
                                />
                            </div>
                            {
                                <ErrorMsg
                                    style={{
                                        width: "50%",
                                        marginLeft: "2.5rem"
                                    }}
                                    error={errors.price ? true : false}
                                >
                                    {errors.price}
                                </ErrorMsg>
                            }
                        </div>
                    </InputContainer>

                    <InputContainer className="row" color={"rgba(201, 147, 62)"}>
                        <Label>Stock:</Label>
                        <InputSimple
                            type={"number"}
                            name="stock"
                            id="number"
                            value={form.stock}
                            onChange={handleChange}
                        />
                        <AvailableContainer isAvailable={isAvailable}>
                            <div>
                                {isAvailable ? "Available" : "Not available"}
                            </div>
                            {isAvailable ? (
                                <MdOutlineEventAvailable />
                            ) : (
                                <CgUnavailable />
                            )}
                        </AvailableContainer>
                    </InputContainer>
                </FirstColumnContainer>

                <SecondColumnContainer>
                    <InputContainer color={"rgba(201, 147, 62)"}>
                        <Label>Categories:</Label>
                        <SelectedList setFormCategories={setForm} form={form} color={"orange"}/>

                        <TagsProduct color="orange">
                            Tags for this product:
                            {form.categories.map((el) => (
                                <TagCard key={el} color="orange">
                                    <div id="tag">{el}</div>
                                    <div id="button">
                                        <button
                                            id="deleteButton"
                                            onClick={() =>
                                                handleDeleteCategory(el)
                                            }
                                        >
                                            X
                                        </button>
                                    </div>
                                </TagCard>
                            ))}
                        </TagsProduct>
                    </InputContainer>

                    <InputContainer>
                        <Label>Img:</Label>
                        <InputFiled
                            type={"file"}
                            name="imageProduct"
                            value={form.img}
                            onChange={handleChangeFile}
                            id="fileinput"
                        />
                    </InputContainer>

            {file ? <PrevContainer>
              <button onClick={handleDeletePrev}>X</button>
              <PrevImgContainer>
                <img src={URL.createObjectURL(file)} alt="preview"/>
              </PrevImgContainer>
              </PrevContainer>:<PrevContainer>
                  <PrevEmptyImgContainer>Preview of your image</PrevEmptyImgContainer>
                </PrevContainer>}
    
      </SecondColumnContainer>
    </MainContainer>    
            {/* LE paso la condicion de que no debe existir error para que se muestre el boton de crear */}
            <ButtonCreate
            color="orange"
                isAvailable={Object.keys(errors).length === 0}
                onClick={() => handleSubmit(file, setFile)}
            >
                Create Product
            </ButtonCreate>
        </GlobalContainer>
    )
}
