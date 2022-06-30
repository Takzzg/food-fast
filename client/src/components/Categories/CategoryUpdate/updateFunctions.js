import swal from "sweetalert"

export const PatchCategory = (form, file, Navigate) => {
    const formdata = new FormData()
    formdata.append("image", file)
    formdata.append("name", form.name)
    formdata.append("description", form.description)
    formdata.append("prevImg", JSON.stringify(form.image))
    fetch(`${process.env.REACT_APP_BACK_URL}/api/v1/categories/${form._id}`, {
        method: "PATCH",
        body: formdata
    }).then((res) => res.json())

    swal({
        title: "The category is updated correctly",
        text: "Continuos!",
        icon: "success"
    }).then(() => Navigate("/dashboard"))
}
export const CleanCategoryImputs = (
    setIsSend,
    setForm,
    setIsAvailable,
    setImgCharge
) => {
    setTimeout(() => {
        setIsSend(false)
    }, 5000)
    setForm({
        name: "",
        description: "",
        img: null
    })
    setIsAvailable(false)
    setImgCharge(false)
    document.getElementById("imageCategory").value = null
}
