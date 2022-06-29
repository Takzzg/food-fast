import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { baseUrl, findCatById } from "../../../redux/actions/async"
import { validateForm } from "../../CustomHooks/validateForm"
import { Message } from "rsuite"

import {
    CreateButton,
    PrevContainer,
    PrevImgContainer,
    ErrorMsg,
    GlobalContainer,
    InputContainer,
    InputFiled,
    InputSimple,
    Label,
    MainContainer,
    MessageContainer
} from "./updateElements"
import { PatchCategory } from "./updateFunctions"
import { Title } from "../../Products/ProductForm/formElements"
import FormBG from "../../FormBG/FormBG"

export default function ModifyCategory() {
    const { id } = useParams()
    const [form, setForm] = useState({ name: "", description: "", image: {} })
    const [errors, setErrors] = useState({})
    // const [isSend, setIsSend] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    const category = useSelector((state) => state.main.categories.detail)

    const [file, setFile] = useState(null)
    const [imgCharge, setImgCharge] = useState(false)

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
        let currentErrors = validateForm({ ...form, [name]: value }, "category")
        setErrors(currentErrors)
    }

    useEffect(() => {
        dispatch(findCatById(id))
        setForm(category)
    }, [dispatch, id, category.name])

    return (
        <GlobalContainer>
            {console.log(form)}
            <FormBG />
            {isEmpty && (
                <MessageContainer color={"red"}>
                    <Message showIcon type="error" header="Error">
                        Product could not be update because of empty fields
                    </Message>
                </MessageContainer>
            )}
            <Title>MODIFY CATEGORY</Title>
            <MainContainer style={{ display: "flex", flexDirection: "column" }}>
                <InputContainer color={"green"}>
                    <Label>Category Name:</Label>
                    <InputSimple
                        onChange={handleChange}
                        type={"text"}
                        name="name"
                        value={form.name}
                        required
                    />
                    {
                        <ErrorMsg error={errors.name ? true : false}>
                            {errors.name}
                        </ErrorMsg>
                    }
                </InputContainer>

                <InputContainer color={"green"}>
                    <Label>Description:</Label>
                    <InputSimple
                        onChange={handleChange}
                        type={"text"}
                        name="description"
                        value={form.description}
                        required
                    />
                    {
                        <ErrorMsg error={errors.description ? true : false}>
                            {errors.description}
                        </ErrorMsg>
                    }
                </InputContainer>
                <InputContainer>
                    <Label>Image:</Label>
                    <InputFiled
                        type={"file"}
                        onChange={handleChangeFile}
                        id="imageCategory"
                        name="imageCategory"
                    />
                    {file ? (
                        <PrevContainer>
                            <button onClick={handleDeletePrev}>X</button>
                            <PrevImgContainer>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="prevView"
                                />
                            </PrevImgContainer>
                        </PrevContainer>
                    ) : (
                        <PrevContainer>
                            <PrevImgContainer>
                                <img
                                    src={form.image && form.image.secure_url}
                                    alt="preview"
                                />
                            </PrevImgContainer>
                        </PrevContainer>
                    )}
                </InputContainer>

                <div>
                    <CreateButton
                        color="green"
                        style={{ marginLeft: "20rem" }}
                        onClick={() => PatchCategory(form, file, Navigate)}
                    >
                        Update Category
                    </CreateButton>
                </div>
            </MainContainer>
        </GlobalContainer>
    )
}
