import { useState } from "react";
import { CleanCategoryImputs, PostCategory } from "../Categories/CategoryForm/PostFunctions";
import { CleanProductsInput, PostProduct } from "../Products/ProductForm/PostFunctions";
import { validateForm } from "./validateForm";
import swal from 'sweetalert';

export default function useForm(type, initialForm, setImgCharge) {

    const [form, setForm] = useState(initialForm); 
    const [errors, setErrors] = useState({});
    const [isAvailable, setIsAvailable] = useState(false);
    const [isSend, setIsSend] = useState(false); 

    const [isEmpty, setIsEmpty] = useState(false); 
 

    const handleChange = (e)=> {

        const {name, value} = e.target; 
        setForm({...form, [name]: value})

        // La función validateForm devuelve un objeto
        let currentErrors = validateForm({...form, [name]: value}, type)
        // Que después seteo en mi estado de errores
        setErrors(currentErrors)
        if(type === "product" && name === "stock") {
            if (value > 0) setIsAvailable(true)
            else setIsAvailable(false)   
        }    
      }

    const handleSubmit =  (file)=> {
        if(!file || form.name === "" || form.description  === "") { 
          setIsEmpty(true)
          setTimeout(()=> setIsEmpty(false), 5000)
          swal(type + " don´t created", "You have empty required imputs", "warning");
        }
        else {  
          const formdata = new FormData()
          if(type === "product") {
            formdata.append('imageProduct', file)
            PostProduct(form, formdata)

            swal("Product Created!", "The product is now in your dashboard", "success")
            .then(()=> 
              CleanProductsInput(setIsSend, setForm, setIsAvailable, setImgCharge)
            )

          } else {
            formdata.append('imageCategory', file);
            PostCategory(form, formdata)

            swal("Category Created!", "The category is now in your dashboard", "success")
            .then(()=> 
              CleanProductsInput(setIsSend, setForm, setIsAvailable, setImgCharge)
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