import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../redux/actions/async";
import styles from "../../CommonUser/orderDetail/tableDetail.module.scss"
import { Link } from "react-router-dom"

export default function OrdersAdmin() {
    const [isStatus, setIsStatus] = useState(false); 
    const [filter, setFilter] = useState({type: "date", form: "asc"})
    const [status, setStatus] = useState("pending")
    const orders = useSelector(state=> state.orders.allOrders); 
    const dispatch = useDispatch(); 

    const handleChange = (e) => {
        const {name, value} = e.target; 
        if (name === "type") {
            if(e.target.value === "status") setIsStatus(true)
            else {
                setIsStatus(false); 
            }
            setFilter({...filter, type: value})
        } else {
            setFilter({...filter, form: value})
        }
    }
    const handleStatusChange = (e) => {
        const {value} = e.target; 
        setStatus(value); 
    }

    const filterOrders = (input) => {
        let current = input; 
        if (filter.type === "date") {
            current.sort((a, b) => new Date(a.date.toString()).getTime() > new Date(b.date.toString()).getTime())
        }
        else if(filter.type === "mount") {
            current.sort((a, b) => Number(a.total) - Number(b.total))
        }
        else if (filter.type === "status"){
            current = input.filter(el=> el.status === status)
        }
        if(filter.form === "dsc") {
            let aux =  current.slice().reverse(); 
            return aux; 
        }
        return current
    }
    useEffect(()=> {
        dispatch(getAllOrder())
    }, [])
    return(
        <section className={styles.ContainerOrder}>
            <div id={styles.title}>
                <div>ORDERS</div>

                <div id={styles.filter}>
                    <label>Filter By:</label>
                    <select onChange={handleChange} name="type">
                        <option value={"mount"}>Mount</option>
                        <option value={"date"}>Date</option>
                        <option value="status">Status</option>
                    </select>
                    {isStatus && <select onChange={handleStatusChange}>
                            <option value={"Pending"}>Pending</option>
                            <option value={"Rejected"}>Rejected</option>
                            <option value={"Accepted"}>Accepted</option>
                            <option value={"Completed"}>Completed</option>
                        </select>}   
                    <div>
                        <input type={"radio"} name="form" value="asc" onChange={handleChange} />
                        <label>Asc</label>
                        <input type={"radio"} name="form" value="dsc" onChange={handleChange}  />
                        <label>Dsc</label>
                    </div>
                </div>
                
           


            </div>
            <div className={styles.table}>
                <div className={styles.rowDetail} id={styles.header}>
                    <div className={styles.cell}>
                        Order
                    </div>
                    <div className={styles.cell}>
                        User
                    </div>
                    <div className={styles.cell}>
                        Date
                    </div>
                    <div className={styles.cell}>
                        Total
                    </div>
                    <div className={styles.cell}>
                        Status
                    </div>
                </div>
                {orders&& filterOrders(orders).map(o=> (
                <Link to={`/dashboard/orders/${o._id}`} className={styles.rowDetail} key={o._id}>
                    <div className={styles.cell} data-title="Order">
                        {o._id}
                    </div>
                    <div className={styles.cell} data-title="User">
                        {o.user}
                    </div>
                    <div className={styles.cell} data-title="Date">
                        {new Date(o.date.toString()).toDateString()}
                    </div>
                    <div className={styles.cell} data-title="Total">
                        $ {o.total}
                    </div>
                    <div className={styles.cell} data-title="SubTotal">
                        {o.status}
                    </div>
    
                </Link>
                ))}
    
            </div>
        </section>)
}