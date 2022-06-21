import axios from "axios"
import { delete_category, delete_product } from "../../redux/actions/sync"
import swal from "sweetalert"; 

const baseUrl = "http://localhost:3001/api/v1"



export default function useDelete (dispatch) {

    const handleDelete = (type, id, imgPath) => {
        let name = "Category"
        
        if(type === "products") {
            name = "Product"
        }
            swal({
                title: "Are you sure?",
                text: `Once deleted, you will not be able to recover the ${name}!`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if(willDelete) {
                axios.delete(`${baseUrl}/${type}/${id}`);
                return true
            } else return false
              }
              ).then((res)=> {
                if(res)  {
                    swal(`The ${name} is deleted!`, {
                    icon: "success"})
                    type=== "categories" ? 
                    dispatch(delete_category(id))
                    :dispatch(delete_product(id))}
                else { swal(`Your ${name} is safe!`); }

            }
              ).catch(err=> console.log(err))
        
    }

    return {handleDelete}
}