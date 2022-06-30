import { DisplayDiv, LateralDiv, StyledContainer, StyledCard, UserDiv, InfoDiv } from './Dashboard2.styled'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from "sweetalert"
import toast, {Toaster} from "react-hot-toast"

/* Componentes Importados */
import CategoryBar from '../../Landing/UbicationBar/UbicationBar';
import CategoryCard from '../../Categories/CategoryCard/CategoryCard';
import ProductCard from '../../Products/ProductCard/ProductCard';
import SearchBar from '../../searchBar';
import OrdersAdmin from '../orders';

/* Íconos */
import { FaTrashAlt, FaEdit, FaUserCircle, FaUsers } from "react-icons/fa"
import { IoIosRestaurant } from "react-icons/io"
import { GiMoneyStack } from "react-icons/gi"

/* Custom hooks & actions */
import useDelete from '../../CustomHooks/useDelete';
import { fetchAllUsers, changePermissions, getAllOrder, fetchAllProducts, fetchAllCategories } from '../../../redux/actions/async';


const Dashboard2 = function(){
    const filterCategories = useSelector(
        (state) => state.main.categories.filtered
    )
    const filterProducts = useSelector(state=>state.main.products.filtered)
    const usersData = useSelector(state=>state.user.usersData)
    const currentUser = useSelector(state=>state.user.authData.user)
    const theme = useSelector(state => state.theme.selectedTheme)
    const allOrders = useSelector(state=>state.orders.allOrders)
    const dispatch = useDispatch();

    //este menu es el que maneja los render de los componentes. Inicializa buscando un menu en el LS,
    //si no existe, setea un objeto "menu" con sus valores en false menos "dashboard", q se muestra primero
    const [menu, setMenu] = useState(
    localStorage.getItem("menu")
      ? JSON.parse(localStorage.getItem("menu"))
      : {
          dashboard: true,
          categories: false,
          products: false,
          users: false,
          orders: false
        }
    );
    const [reRender, setreRender] = useState(0);
    const [ventasTotales, setVentasTotales] = useState(0);
    
    function totalVentas(){
        let total=0;
        allOrders.forEach(o=>{
            total+=o.total;
        })
        setVentasTotales(total);
    }
    useEffect(()=> {
        dispatch(fetchAllProducts())
        dispatch(fetchAllCategories())
    }, [])
    
    useEffect(() => {
        //cada q cambia el menu, guarda en el LS el menu actual.
        window.localStorage.setItem("menu", JSON.stringify(menu));
        if(!usersData.length) dispatch(fetchAllUsers());
        if(!allOrders.length) dispatch(getAllOrder())
        if(ventasTotales===0) totalVentas();
    }, [menu, allOrders]);
    
    function handleMenu(element) { //"value" ERA un boolean :v (segundo parámetro)
        setMenu(() => {
          return {
            dashboard: false,
            categories: false,
            products: false,
            users: false,
            [element]: true, //este campo en realidad sobreescribe los existentes. Seteando en true
            // el campo que fue seleccionado.
          };
        });
    }

    function handlePermissions(id, rol) {
        swal("¿Seguro que deseas cambiar el rol a este Usuario?", {
            buttons: ["Cancelar", true],
          }).then(respuesta=> { 
              if(respuesta){ 
                //action hacer admin al usuario 
                
                if(rol === "ADMIN"){ 
                    toast.success("Le quitó permisos de Admin a este usuario!")
                    dispatch(changePermissions(id, rol="USER"))
                    setreRender(reRender+1)
                }else{
                   toast.success("Le dió permisos de Admin a este usuario!")
                   dispatch(changePermissions(id, rol="ADMIN"))
                   setreRender(reRender+1)
               }
              }
          })
    }

    const { handleDelete } = useDelete(dispatch)

    //           ********   mini components  **********
    const Category = ({ c }) => (
        <StyledCard theme={theme}>
            <CategoryCard category={c} url={`/categories/${c._id}`} />
            <button
                className="deleteBtn"
                onClick={() => handleDelete("categories", c._id, c.img)}
            >
                <FaTrashAlt />
                Delete
            </button>
            <Link className="editBtn" to={`/dashboard/modifyCategory/${c._id}`}>
                <FaEdit />
                Edit
            </Link>
        </StyledCard>
    )

    const Product = ({ p }) => (
        <StyledCard theme={theme}>
            <ProductCard product={p} />
            <button
                className="deleteBtn"
                onClick={() => handleDelete("products", p._id, p.img)}>
                <FaTrashAlt />
                Delete
            </button>
            <Link className="editBtn" to={`/dashboard/updateProduct/${p._id}`}>
                <FaEdit />
                Edit
            </Link>
        </StyledCard>
    )

    const User = ({ u }) => (
        <div className='userCard'>
            {
            u.isGoogleAccount ? <img src={u.photo} referrerPolicy="no-referrer"
            className='google_photo'/>
            : <FaUserCircle className='userCircle'/>
            }
            <span>{u.email}</span>
            <span>{u.rol}</span>
            <button className='roleBtn'
                onClick={()=> handlePermissions(u._id, u.rol)}>
                {u.rol === "ADMIN" ? "Remover permiso" : "Dar permisos"}
            </button>
            <button className="deleteBtn"
                onClick={() => handleDelete("user", u._id, u.img)}>
                Delete
                <FaTrashAlt className='buttonIcon'/>
            </button>
        </div>
    )

    //****************************************************
    return (
        <StyledContainer>
            <Toaster/>
            <LateralDiv>
                <section className='user_section'>
                    {currentUser.isGoogleAccount ? <img src={currentUser.photo}
                    referrerPolicy='no-referrer' className='google_photo'/>
                    : <FaUserCircle className='userCircle'/>}
                    <p>{currentUser.name}</p>
                    "Administrador"
                </section>
                <div className='ButtonsContainer'>
                    <button onClick={() => handleMenu("dashboard")}
                    className="menuBtn">
                        D a s h b o a r d
                    </button>
                    <button onClick={() => handleMenu("categories")}
                    className="menuBtn">
                        C a t e g o r í a s
                    </button>
                    <button onClick={() => handleMenu("products")}
                    className="menuBtn">
                        P r o d u c t o s
                    </button>
                    <button onClick={() => handleMenu("users")}
                    className="menuBtn">
                        U s u a r i o s
                    </button>
                    <button onClick={() => handleMenu("orders")}
                    className="menuBtn">
                        Ó r d e n e s
                    </button>
                    
                    
                </div>
            </LateralDiv>

            <DisplayDiv theme={theme}>
            {menu.dashboard ? (
                <InfoDiv>
                    <article className='infoCard'>
                        <FaUsers/>
                        <h3 className='infoTitle'>Usuarios registrados</h3>
                        <div className='info'>{usersData.length}</div>
                    </article>
                    <article className='infoCard'>
                        <IoIosRestaurant/>
                        <h3 className='infoTitle'>Ventas realizadas</h3>
                        <div className='info'>{allOrders.length}</div>
                    </article>
                    <article className='infoCard'>
                        <GiMoneyStack/>
                        <h3 className='infoTitle'>Total Ventas</h3>
                        <div className='info'>${ventasTotales}</div>
                    </article>
                </InfoDiv>
            ) : menu.users ? (
                <UserDiv theme={theme}>
                    <section className='cabezal'><p>Usuarios</p></section>
                    <div className='allUsers'>
                        {!usersData.length ? (
                            <div>Sin resultados aún... :(</div>
                        ):(
                            usersData.map(u=>
                                <User key={u._id} u={u} />
                            )
                        )}
                    </div>
                </UserDiv>
            ) : menu.categories ? (
                <div className="categories">
                    <CategoryBar />

                    <Link className="addBtn" to="createCategory"> 
                        Crear categoria nueva
                    </Link>

                    <div className="allCategories">
                        {filterCategories.length === 0 ? (
                            <div>Not results found</div>
                        ) : (
                            filterCategories.map((c) => (
                                <Category key={c._id} c={c} />
                            ))
                        )}
                    </div>
                </div>
            ) : menu.products ? (
            <div className="products">
                <SearchBar />

                <Link className="addBtn" to="createProduct">
                    Crear producto nuevo
                </Link>

                <div className="allProducts">
                    {filterProducts.length === 0 ? (
                        <div>No se encontraron resultados aún...</div>
                    ) : (
                        filterProducts.map((p) => (
                            <Product p={p} key={p._id} />
                        ))
                    )}
                </div>
            </div>
            ): menu.orders && 
            <div id='orders'>
                <OrdersAdmin/>
            </div>}

            </DisplayDiv>
        </StyledContainer>
    )
}

export default Dashboard2;