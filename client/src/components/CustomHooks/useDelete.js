import axios from "axios"
import {
    delete_category,
    delete_product,
    delete_user
} from "../../redux/actions/sync"
import swal from "sweetalert"

const baseUrl = `${process.env.REACT_APP_BACK_URL}/api/v1`

export default function useDelete(dispatch) {
    const handleDelete = (type, id, imgPath) => {
        let name = ""

        /*         if(type === "products") {
                    name = "Product"
                } */

        switch (type) {
            case "categories":
                name = "Category"
                break
            case "products":
                name = "Product"
                break
            case "user":
                name = "User"
                break
            case "orders":
                name = "Order"
                break
            default:
                break
        }

        if (type === "orders") {
            name = "orders"
        }
        swal({
            title: "Are you sure?",
            text: `Once deleted, you will not be able to recover the ${name}!`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`${baseUrl}/${type}/${id}`)
                    return true
                } else return false
            })
            .then((res) => {
                if (res) {
                    if (type === "orders") {
                        window.location = "/dashboard/orders"
                    } else {
                        swal(`The ${name} is deleted!`, {
                            icon: "success"
                        })
                        type === "categories"
                            ? dispatch(delete_category(id))
                            : dispatch(delete_product(id))
                    }
                } else {
                    swal(`Your ${name} is safe!`)
                }
            })
            .catch((err) => console.log(err))

        swal({
            title: "Are you sure?",
            text: `Once deleted, you will not be able to recover the ${name}!`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`${baseUrl}/${type}/${id}`)
                    return true
                } else return false
            })
            .then((res) => {
                if (res) {
                    if (type === "orders") {
                        window.location = "/dashboard/orders"
                    } else {
                        swal(`The ${name} is deleted!`, { icon: "success" })
                        type === "categories"
                            ? dispatch(delete_category(id))
                            : type === "products"
                            ? dispatch(delete_product(id))
                            : dispatch(delete_user(id))
                    }
                } else {
                    swal(`Your ${name} is still here!`)
                }
            })
            .catch((err) => console.log(err))
    }

    return { handleDelete }
}
