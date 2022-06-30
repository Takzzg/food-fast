import React, { useEffect } from "react"; 
import {useDispatch, useSelector} from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getUserOrders } from "../../../redux/actions/async";
import { GlobalContainer, NotOrders, OrdersContainer } from "./elements";
import "./table.scss"
export default function UserOrders (){
    const params = useParams(); 
    const dispatch = useDispatch(); 
    const orders= useSelector(state=> state.orders.ordersUser);
    useEffect(()=> {
        dispatch(getUserOrders(params.userID))
    }, [])
    return(
    <GlobalContainer>

        <OrdersContainer>
            <div className="table">
            <div className="title">
                <h1>Mis órdenes de compra</h1>
            </div>
            {orders.length === 0 ? <NotOrders>
                Aún no tienes órdenes realizadas
                <div>
                    <Link to="/products">Ir a ver productos</Link>
                </div>
            </NotOrders>:
            <div>
                <div className="header">
                <div className="row">
                    <div>ID</div>
                    <div>Monto</div>
                    <div>Fecha</div>
                    <div>Estado</div>
                </div>
            </div>


            <div className="body">
                {orders.map(el=> (
                    <Link to={`/orders/${el._id}`} key={el._id}
                    style={{textDecoration:"none", color: "black"}}>
                        <div className="row">
                            <div>{el._id}</div>
                            <div>{el.total}</div>
                            <div>{new Date(el.date.toString()).toDateString()}</div>
                            <div>{el.status}</div>
                        </div>
                    </Link>
                ))}
               
            </div>   
            </div>
            }
            
            </div>
        </OrdersContainer>
    </GlobalContainer>)
}