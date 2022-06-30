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
    TagsProduct,
    TagCard,
    AvailableContainer,
    ErrorMsg,
    ButtonCreate,
    MessageContainer,
    PrevContainer,
    PrevImgContainer,
    Title,
    ButtonCreate2
} from "../ProductForm/formElements"
import SelectedList from "../ProductForm/selectedList"
import { CgUnavailable } from "react-icons/cg"
import { MdOutlineEventAvailable } from "react-icons/md"
import { useEffect } from "react"
import { Message } from "rsuite"
import { baseUrl, findProductById } from "../../../redux/actions/async"
import { useDispatch, useSelector } from "react-redux"
import { validateForm } from "../../CustomHooks/validateForm"
import { useNavigate, useParams } from "react-router-dom"
import { PatchProduct } from "./updateFunctions"
import FormBG from "../../FormBG/FormBG"

export default function UpdateProduct() {
    const { id } = useParams()
    const Navigate = useNavigate(); 
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categories: [],
        image: null
    })

    const [errors, setErrors] = useState({})
    const [isSend, setIsSend] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    const dispatch = useDispatch()
    const product = useSelector((state) => state.main.products.selected)
    const [isAvailable, setIsAvailable] = useState(false)

    const [file, setFile] = useState(null)
    const [imgCharge, setImgCharge] = useState(false)

    const handleDeleteCategory = (value) => {
        setForm({
            ...form,
            categories: form.categories.filter((el) => el !== value)
        })
    }
    const handleDeletePrev = () => {
        document.getElementById("imageCategory").value = null
        setFile(null)
    }

    const handleChangeFile = (e) => {
        const newFile = e.target.files[0]
        setFile(newFile)
        if (newFile) setImgCharge(true)
        else setImgCharge(false)

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
        let currentErrors = validateForm({ ...form, [name]: value }, "product")
        setErrors(currentErrors)
        if (name === "stock") {
            if (e.target.value > 0) setIsAvailable(true)
            else setIsAvailable(false)
        }
    }

    useEffect(() => {
        dispatch(findProductById(id))
        setForm(product)
    }, [dispatch, id, product.name])

    return (
        <GlobalContainer>
            <FormBG />

            {isSend && (
                <MessageContainer color={"green"}>
                    <Message showIcon type="success" header="Success" full>
                        Product modify correctly!
                    </Message>
                </MessageContainer>
            )}

            {isEmpty && (
                <MessageContainer color={"red"}>
                    <Message showIcon type="error" header="Error">
                        Product could not be created because of empty fields
                    </Message>
                </MessageContainer>
            )}

            <Title>MODIFY PRODUCT</Title>
            <MainContainer>
                <FirstColumnContainer>
                    <InputContainer color={"green"}>
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

                    <InputContainer color={"green"}>
                        <Label>Description:</Label>
                        <InputTextArea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            color="green"
                        />
                        {
                            <ErrorMsg error={errors.description ? true : false}>
                                {errors.description}
                            </ErrorMsg>
                        }
                    </InputContainer>

                    <InputContainer className="rowForm" color={"green"}>
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

                    <InputContainer className="rowForm" color={"green"}>
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
                    <InputContainer>
                        <Label>Categories:</Label>
                        <SelectedList
                            setFormCategories={setForm}
                            form={form}
                            color={"green"}
                        />
                        <TagsProduct color="green">
                            Tags for this product:
                            {form.categories &&
                                form.categories.map((el) => (
                                    <TagCard key={el} color="green">
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
                            onChange={handleChangeFile}
                            id="fileinput"
                        />
                    </InputContainer>

                    {file ? (
                        <PrevContainer>
                            <button onClick={handleDeletePrev}>X</button>
                            <PrevImgContainer>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                />
                            </PrevImgContainer>
                        </PrevContainer>
                    ) : (
                        <PrevContainer>
                            <PrevImgContainer>
                                {/* <img src={IMAGE_PRODUCT +id} alt="preview"/> */}
                                <img
                                    src={form.image && form.image.secure_url}
                                    alt="preview"
                                />
                            </PrevImgContainer>
                        </PrevContainer>
                    )}
                </SecondColumnContainer>
            </MainContainer>
            {/* LE paso la condicion de que no debe existir error para que se muestre el boton de crear */}
            <ButtonCreate2
                color="green"
                isAvailable={Object.keys(errors).length === 0}
                onClick={() =>
                    PatchProduct(
                        id,
                        form,
                        imgCharge,
                        file,
                        setIsSend,
                        setForm,
                        setIsAvailable,
                        setImgCharge,
                        Navigate
                    )
                }
            >
                Update Product
            </ButtonCreate2>
        </GlobalContainer>
    )
}
