
export const PostCategory = (input, formdata) => {
    const url = `http://localhost:3001/api/v1/categories?name=${input.name}&description=${input.description}`
    fetch(url, {
        method: "POST", 
        body: formdata
    })
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
        img: ""
    })
    setIsAvailable(false)
    setImgCharge(false)
    document.getElementById("imageCategory").value = ""
}
