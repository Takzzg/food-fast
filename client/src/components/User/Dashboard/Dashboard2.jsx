//import styles from "";
import { DisplayDiv, LateralDiv, StyledContainer, StyledCard, UserDiv } from './Dashboard2.styled'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CategoryBar from '../../Landing/UbicationBar/UbicationBar';
import CategoryCard from '../../Categories/CategoryCard/CategoryCard';
import ProductCard from '../../Products/ProductCard/ProductCard';
import SearchBar from '../../searchBar';

import { FaTrashAlt, FaEdit, FaUserCircle } from "react-icons/fa"
import useDelete from '../../CustomHooks/useDelete';
import { fetchAllUsers, changePermissions } from '../../../redux/actions/async';

import swal from "sweetalert"
import toast, {Toaster} from "react-hot-toast"

const Dashboard2 = function(){
    const filterCategories = useSelector(
        (state) => state.main.categories.filtered
    )
    const filterProducts = useSelector(state=>state.main.products.filtered)
    const usersData = useSelector(state=>state.user.usersData)
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.selectedTheme)

    //este menu es el que maneja los render de los componentes. Inicializa buscando un menu en el LS,
    //si no existe, setea un objeto "menu" con sus valores en false menos "dashboard", q se muestra primero
    const [menu, setMenu] = useState(
    localStorage.getItem("menu")
      ? JSON.parse(localStorage.getItem("menu"))
      : {
          dashboard: true,
          categories: false,
          products: false,
          users: false
        }
    );
    const [reRender, setreRender] = useState(0);

    
    useEffect(() => {
        //cada q cambia el menu, guarda en el LS el menu actual. Terminar de implementar*
        window.localStorage.setItem("menu", JSON.stringify(menu));
        if(!usersData.length) dispatch(fetchAllUsers());
    }, [menu]);
    
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
            <FaUserCircle/>
            <span>{u.email}</span>
            <span>{u.rol}</span>
            <button className='roleBtn'
                onClick={()=> handlePermissions(u._id, u.rol)}>
                {u.rol === "ADMIN" ? "Remove permissions" : "Give permissions"}
            </button>
            <button className="deleteBtn"
                onClick={() => handleDelete("user", u._id, u.img)}>
                <FaTrashAlt />
                Delete
            </button>
        </div>
    )

    //****************************************************
    return (
        <StyledContainer>
            <Toaster/>
            <LateralDiv>
                <section>foto... nombre usuari... "Admin"</section>
                <div className='ButtonsContainer'>
                    <button onClick={() => handleMenu("dashboard")}>
                        Dashboard menu
                    </button>
                    <button onClick={() => handleMenu("categories")}>
                        Botón categorías
                    </button>
                    <button onClick={() => handleMenu("products")}>
                        Botón Products
                    </button>
                    <button onClick={() => handleMenu("users")}>
                        Botón Users
                    </button>
                </div>
            </LateralDiv>

            <DisplayDiv theme={theme}>
            {menu.dashboard ? (
                <>
                Dashboard (tarjetitas con info)
                </>
            ) : menu.users ? (
                <UserDiv>
                    <h3>Users</h3>
                    <div className='allUsers'>
                        {!usersData.length ? (
                            <div>No users found...</div>
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
            ) : menu.products && 
            <div className="products">
                <SearchBar />

                <Link className="addBtn" to="createProduct">
                    Crear producto nuevo
                </Link>

                <div className="allProducts">
                    {filterProducts.length === 0 ? (
                        <div>Not results found</div>
                    ) : (
                        filterProducts.map((p) => (
                            <Product p={p} key={p._id} />
                        ))
                    )}
                </div>
            </div>}


            </DisplayDiv>
        </StyledContainer>
    )
}

export default Dashboard2;