import React, { useEffect, useState } from "react"
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
    TagsProduct,
    TagCard,
    AvailableContainer,
    ErrorMsg,
    ButtonCreate,
    PrevContainer,
    PrevImgContainer,
    PrevEmptyImgContainer,
    Title
} from "./formElements"
import SelectedList from "./selectedList"
import { CgUnavailable } from "react-icons/cg"
import { MdOutlineEventAvailable } from "react-icons/md"

import FormBG from "../../FormBG/FormBG"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchAllCategories, postProduct } from "../../../redux/actions/async"
import swal from "sweetalert"

const initialForm = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categories: [],
    img: ""
}

export default function ProductForm() {
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const [file, setFile] = useState(null)
    const [productForm, setProductForm] = useState(initialForm)
    const [productErrors, setProductErrors] = useState(initialForm)
    const [disablePostBtn, setDisablePostBtn] = useState(true); 

    const isAvailable = !!(productForm.stock > 0)

    const controllButton = () => {
        if (productErrors.name || productErrors.description || productErrors.price) {
            return setDisablePostBtn(true); 
        }
        return setDisablePostBtn(false)
    } 

    useEffect(() => {
        let newErrors = { ...initialForm }

        if (!productForm.name) newErrors.name = "Name is Required"
        else if (productForm.name.length <= 3)
            newErrors.name = "Name must have at least 3 characters"

        if (!productForm.description)
            newErrors.description = "Description is Required"
        else if (productForm.description.length <= 5)
            newErrors.description =
                "Description must have at least 5 characters"

        if (!productForm.price || productForm.price <= 0)
            newErrors.price = "Invalid price"

        setProductErrors(newErrors)
        controllButton()
    }, [productForm])

    useEffect(()=>{
        dispatch(fetchAllCategories()); 
    }, [])
    const handleProductForm = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value })
    }

    const handleProductFormFile = (e) => {
        const newFile = e.target.files[0]
        setFile(newFile)
    }

    const handleDeleteCategory = (value) => {
        setProductForm({
            ...productForm,
            categories: productForm.categories.filter((el) => el !== value)
        })
    }

    const handleProductPost = () => {
        const formdata = new FormData()
        formdata.append("name", productForm.name)
        formdata.append("description", productForm.description)
        formdata.append("price", productForm.price)
        formdata.append("stock", productForm.stock)
        formdata.append("categories", JSON.stringify(productForm.categories))
        formdata.append("image", file)
        dispatch(postProduct(formdata))
            .then(() =>
                swal(
                    "Product Created!",
                    "The product is now in your dashboard",
                    "success"
                )
            )
            .then(() => Navigate("/dashboard"))
    }

    return (
        <GlobalContainer>

            <FormBG />
            <Title>CREATE PRODUCT</Title>
            <MainContainer>
                <FirstColumnContainer>
                    <InputContainer color={"rgba(201, 147, 62)"}>
                        <Label>Name:</Label>
                        <InputSimple
                            type={"text"}
                            placeholder="Pizza..."
                            name="name"
                            value={productForm.name}
                            onChange={handleProductForm}
                        />
                        {
                            <ErrorMsg error={productErrors.name ? true : false}>
                                {productErrors.name}
                            </ErrorMsg>
                        }
                    </InputContainer>

                    <InputContainer color={"rgba(201, 147, 62)"}>
                        <Label>Description:</Label>
                        <InputTextArea
                            color={"rgba(201, 147, 62)"}
                            name="description"
                            value={productForm.description}
                            onChange={handleProductForm}
                        />
                        {
                            <ErrorMsg
                                error={productErrors.description ? true : false}
                            >
                                {productErrors.description}
                            </ErrorMsg>
                        }
                    </InputContainer>

                    <InputContainer
                        className="rowForm"
                        color={"rgba(201, 147, 62)"}
                    >
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
                                    value={productForm.price}
                                    onChange={handleProductForm}
                                />
                            </div>
                            {
                                <ErrorMsg
                                    style={{
                                        width: "50%",
                                        marginLeft: "2.5rem"
                                    }}
                                    error={productErrors.price ? true : false}
                                >
                                    {productErrors.price}
                                </ErrorMsg>
                            }
                        </div>
                    </InputContainer>

                    <InputContainer
                        className="rowForm"
                        color={"rgba(201, 147, 62)"}
                    >
                        <Label>Stock:</Label>
                        <InputSimple
                            type={"number"}
                            name="stock"
                            id="number"
                            value={productForm.stock}
                            onChange={handleProductForm}
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
                        <SelectedList
                            setFormCategories={setProductForm}
                            form={productForm}
                            color={"orange"}
                        />

                        <TagsProduct color="orange">
                            Categories for this product:
                            {productForm.categories.map((el) => (
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
                            value={productForm.img}
                            onChange={handleProductFormFile}
                            id="fileinput"
                        />
                    </InputContainer>

                    {file ? (
                        <PrevContainer>
                            <button onClick={() => setFile("")}>X</button>
                            <PrevImgContainer>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                />
                            </PrevImgContainer>
                        </PrevContainer>
                    ) : (
                        <PrevContainer>
                            <PrevEmptyImgContainer>
                                Preview of your image
                            </PrevEmptyImgContainer>
                        </PrevContainer>
                    )}
                </SecondColumnContainer>
                <ButtonCreate
                    color="orange"
                    isAvailable={!disablePostBtn}
                    onClick={() => handleProductPost(file, setFile)}
                >
                    Create Product
                </ButtonCreate>
            </MainContainer>
        </GlobalContainer>
    )
}
