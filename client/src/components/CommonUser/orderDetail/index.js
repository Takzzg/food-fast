import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getUserOrderbyID } from "../../../redux/actions/async";
import styles from "./tableDetail.module.scss"; 

export default function OrderDetail() {
    const params= useParams(); 
    const order = useSelector(state=> state.orders.selected);
    const dispatch = useDispatch(); 
    useEffect(()=> {
        dispatch(getUserOrderbyID(params.orderID))
    }, [])
    return(
    <section className={styles.ContainerOrder}>
        <div id={styles.title}>
            <div>Order N° -- {order._id} </div>
            <div>Status -- {order.status}</div>
        </div>
        <div className={styles.table}>
            <div className={styles.rowDetail} id={styles.header}>
                <div className={styles.cell}>
                    Product
                </div>
                <div className={styles.cell}>
                    Unit Price
                </div>
                <div className={styles.cell}>
                    Quantity
                </div>
                <div className={styles.cell}>
                    Date
                </div>
                <div className={styles.cell}>
                    SubTotal
                </div>
            </div>
            {order.products && order.products.map(p=> (
            <Link to={`/products/${p.id}`} className={styles.rowDetail} key={p._id}>

                <div className={styles.cell} data-title="Product">
                    {p.name}
                </div>
                <div className={styles.cell} data-title="Unit Price">
                    $ {p.price}
                </div>
                <div className={styles.cell} data-title="Quantity">
                    {p.quantity}
                </div>
                <div className={styles.cell} data-title="Date">
                    {new Date(order.date.toString()).toDateString()}
                </div>
                <div className={styles.cell} data-title="SubTotal">
                    $ {p.subTotal}
                </div>

            </Link>
            ))}

            <div className={styles.rowDetail} id={styles.footer}>
                    <div className={styles.cell} >TOTAL</div>
                    <div className={styles.cell} ></div>
                    <div className={styles.cell} ></div>
                    <div className={styles.cell} ></div>
                    <div className={styles.cell} >$/ {order.total}</div>
            </div>
        </div>
    </section>)
}