import toast,{Toaster} from 'react-hot-toast';
import { Navigate} from 'react-router-dom';

//logica de autenticacion con use selector authData


const PrivateRoute = function(props){

    var userRol = JSON.parse(localStorage.getItem("profile"))?.user.rol;
    if(!userRol) userRol = "GUEST" //rol por defecto a no logueados

    const { element: Element} = props;  
    const requiredRol = props?.requiredRol;
    var auth = userRol !== "GUEST" ? true : false
    requiredRol && requiredRol === "ADMIN" && requiredRol !== userRol && (auth = false);

    return(
        auth ? <Element/> : <div>
            {toast.error("No tienes permisos para esta acción.")}
            <Toaster/>
            {
                userRol === "GUEST" ? (<Navigate to='/login'/>):(
                    <Navigate to='/'/>
                )
            }
        </div>
    )
}
export default PrivateRoute