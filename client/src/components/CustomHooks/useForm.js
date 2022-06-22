import { useState } from "react"
import { useDispatch } from "react-redux"
// import {
//     CleanCategoryImputs,
//     PostCategory
// } from "../Categories/CategoryForm/PostFunctions"
import {
    CleanProductsInput
    // PostProduct
} from "../Products/ProductForm/PostFunctions"
import { validateForm } from "./validateForm"
import swal from "sweetalert"
import { postCategory, postProduct } from "../../redux/actions/async"

export default function useForm(type, initialForm, setImgCharge) {
    const dispatch = useDispatch()
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [isAvailable, setIsAvailable] = useState(false)
    const [isSend, setIsSend] = useState(false)

    const [isEmpty, setIsEmpty] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })

        // La función validateForm devuelve un objeto
        let currentErrors = validateForm({ ...form, [name]: value }, type)
        // Que después seteo en mi estado de errores
        setErrors(currentErrors)
        if (type === "product" && name === "stock") {
            if (value > 0) setIsAvailable(true)
            else setIsAvailable(false)
        }
    }

    const handleSubmit = (file) => {
        if (!file || form.name === "" || form.description === "") {
            setIsEmpty(true)
            setTimeout(() => setIsEmpty(false), 5000)
            swal(
                type + " don´t created",
                "You have empty required imputs",
                "warning"
            )
        } else {
            const formdata = new FormData()
            if (type === "product") {
                formdata.append("name", form.name)
                formdata.append("description", form.description)
                formdata.append("price", form.price)
                formdata.append("stock", form.stock)
                formdata.append("categories", form.categories)
                formdata.append("imageProduct", file)
                dispatch(postProduct(formdata))
                // PostProduct(form, formdata)

                swal(
                    "Product Created!",
                    "The product is now in your dashboard",
                    "success"
                ).then(() =>
                    CleanProductsInput(
                        setIsSend,
                        setForm,
                        setIsAvailable,
                        setImgCharge
                    )
                )
            } else {
                formdata.append("name", form.name)
                formdata.append("description", form.description)
                formdata.append("imageCategory", file)
                dispatch(postCategory(formdata))

                swal(
                    "Category Created!",
                    "The category is now in your dashboard",
                    "success"
                ).then(() =>
                    CleanProductsInput(
                        setIsSend,
                        setForm,
                        setIsAvailable,
                        setImgCharge
                    )
                )
            }
        }
    }
    return {
        form,
        handleChange,
        isAvailable,
        errors,
        setForm,
        isSend,
        handleSubmit,
        isEmpty
    }
}
