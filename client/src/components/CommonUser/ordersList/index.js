import React, { useEffect } from "react"; 
import {useDispatch, useSelector} from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getUserOrders } from "../../../redux/actions/async";
import { GlobalContainer, OrdersContainer } from "./elements";
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
                <h1>My orders</h1>
            </div>
            <div className="header">
                <div className="row">
                    <div>Order ID</div>
                    <div>Mount</div>
                    <div>Date</div>
                    <div>Status</div>
                </div>
            </div>

            <div className="body">
                {orders.map(el=> (
                    <Link to={`/orders/${el._id}`} style={{textDecoration:"none", color: "black"}}>
                        <div className="row">
                            <div>{el._id}</div>
                            <div>{el.total}</div>
                            <div>{el.date}</div>
                            <div>{el.status}</div>
                        </div>
                    </Link>
                ))}
               
               
            </div>
                </div>
        </OrdersContainer>
    </GlobalContainer>)
}