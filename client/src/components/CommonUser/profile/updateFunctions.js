import swal from "sweetalert"
import axios from "axios"
import { LOG_OUT } from "../../../redux/actions/types"

export const patchUser = async (id, name, address, dispatch) => {
    try {
        const response = await axios.patch(
            `${process.env.REACT_APP_BACK_URL}/api/v1/user/${id}`,
            {
                name,
                address
            }
        )
        swal({
            title: "Your information is updated correctly",
            text: "Login again for see the changes",
            icon: "success"
        }).then(function () {
            dispatch({ type: LOG_OUT })
            window.location = "/login"
        })
    } catch (e) {
        swal({
            title: "Your information could not be updated",
            text: "Try again :/",
            icon: "error"
        })
    }
}
