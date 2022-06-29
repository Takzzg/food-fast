import swal from "sweetalert"

export const PatchProduct = (
    id,
    form,
    imgCharge,
    file,
    setIsSend,
    setForm,
    setIsAvailable,
    setImgCharge
) => {
    const url = `http://localhost:3001/api/v1/products/${id}`
    const formdata = new FormData()
        formdata.append("name", form.name)
        formdata.append("description", form.description)
        formdata.append("price", form.price)
        formdata.append("stock", form.stock)
        formdata.append("categories", form.categories)
        formdata.append("prevImg", JSON.stringify(form.image))
        formdata.append("image", file)

    fetch(url, {
            method: "PATCH",
            body: formdata
        })
            .then((res) => setIsSend(true))
            .catch((err) => console.log(err))
        CleanProductsInput(setIsSend, setForm, setIsAvailable, setImgCharge)
    

    swal({
        title: "The product is updated correctly",
        text: "Continuos!",
        icon: "success"
    }).then(function () {
        window.location = "/dashboard"
    })
}

export const CleanProductsInput = (
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
    document.getElementById("fileinput").value = null
}
