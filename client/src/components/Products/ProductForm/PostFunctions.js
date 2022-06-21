

export const PostProduct = (form, formdata) => {
    const url = `http://localhost:3001/api/v1/products?name=${form.name}&description=${form.description}&stock=${form.stock}&price=${form.price}&categories=${form.categories}`
    fetch(url, {
        method: "POST", 
        body: formdata
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
        price: 0,
        stock: 0,
        img: "",
        categories: []
    })
    setIsAvailable(false)
    setImgCharge(false)
    document.getElementById("fileinput").value = ""
}
