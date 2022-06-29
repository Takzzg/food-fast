import React, { useEffect, useState } from "react"
import {
    ErrorMsg,
    GlobalContainer,
    InputContainer,
    InputFiled,
    InputSimple,
    Label,
    MainContainer,
    Title
} from "../../Products/ProductForm/formElements"
import styles from "./category.module.scss"
import {
    CreateButton,
    PrevContainer,
    PrevImgContainer,
    PrevEmptyImgContainer
} from "./categoryElements"
import FormBG from "../../FormBG/FormBG"
import { useDispatch } from "react-redux"
import { postCategory } from "../../../redux/actions/async"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"

const initialForm = {
    name: "",
    description: "",
    image: {}
}

export default function CategoryForm() {
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const [file, setFile] = useState(null)
    const [categoryForm, setCategoryForm] = useState(initialForm)
    const [categoryErrors, setCategoryErrors] = useState(initialForm)

    const disablePostBtn = !!(
        categoryErrors.name ||
        categoryErrors.description ||
        categoryErrors.img
    )

    useEffect(() => {
        let newErrors = { ...initialForm }

        if (!categoryForm.name) newErrors.name = "Name is Required"
        else if (categoryForm.name.length <= 3)
            newErrors.name = "Name must have at least 3 characters"

        if (!categoryForm.description)
            newErrors.description = "Description is Required"
        else if (categoryForm.description.length <= 5)
            newErrors.description =
                "Description must have at least 5 characters"

        setCategoryErrors(newErrors)
    }, [categoryForm])

    const handleCategoryForm = (e) => {
        setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value })
    }

    const handleCategoryPost = () => {
        const formdata = new FormData()
        formdata.append("name", categoryForm.name)
        formdata.append("description", categoryForm.description)
        formdata.append("image", file)
        dispatch(postCategory(formdata))
            .then(() =>
                swal(
                    "Category Created!",
                    "The category is now in your dashboard",
                    "success"
                )
            )
            .then(() => Navigate("/dashboard"))
    }

    const handleChangeFile = (e) => {
        const newFile = e.target.files[0]
        setFile(newFile)
    }

    return (
        <GlobalContainer>
            <FormBG />
            <Title>CREATE CATEGORY</Title>
            <MainContainer id={styles.MainContainer}>
                <InputContainer color={"rgba(201, 147, 62)"}>
                    <Label>Category Name:</Label>
                    <InputSimple
                        onChange={handleCategoryForm}
                        type={"text"}
                        name="name"
                        value={categoryForm.name}
                        required
                    />
                    {
                        <ErrorMsg error={categoryErrors.name ? true : false}>
                            {categoryErrors.name}
                        </ErrorMsg>
                    }
                </InputContainer>

                <InputContainer color={"rgba(201, 147, 62)"}>
                    <Label>Description:</Label>
                    <InputSimple
                        onChange={handleCategoryForm}
                        type={"text"}
                        name="description"
                        value={categoryForm.description}
                        required
                    />
                    {
                        <ErrorMsg
                            error={categoryErrors.description ? true : false}
                        >
                            {categoryErrors.description}
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
                            <button onClick={() => setFile("")}>X</button>
                            <PrevImgContainer>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="prevView"
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
                </InputContainer>

                <CreateButton
                    color={"orange"}
                    onClick={handleCategoryPost}
                    id={styles.createStore}
                    disabled={disablePostBtn}
                >
                    Create Category
                </CreateButton>
            </MainContainer>
        </GlobalContainer>
    )
}
