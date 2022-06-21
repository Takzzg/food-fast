import swal from 'sweetalert'


export const PatchCategory = (form, file) =>{
    if(!file) {
        fetch(`http://localhost:3001/api/v1/categories/${form._id}?name=${form.name}&description=${form.description}`, {
            method: "PATCH"
        })
    } else {
        const formdata = new FormData(); 
        formdata.append('imageCategory', file)
        fetch(`http://localhost:3001/api/v1/categories/${form._id}?name=${form.name}&description=${form.description}`, {
            method: "PATCH",
            body: formdata  
        }).then(res=> res.json())  
    }
    swal({
        title: "The category is updated correctly",
        text: "Continuos!",
        icon: "success",
      }).then(function() {
        window.location = "/dashboard";
    });
}
export const CleanCategoryImputs = (setIsSend, setForm, setIsAvailable, setImgCharge) => {
    setTimeout(()=> {
        setIsSend(false)
      }, 5000)
    setForm({
      name: "",
      description: "",
      img: null
    })
    setIsAvailable(false)   
    setImgCharge(false)
    document.getElementById("imageCategory").value = null;
}