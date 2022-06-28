import React, { useEffect, useState } from "react"
import {
    DetailsOrder,
    DetailsProducts,
    FirstRow,
    GlobalContainer,
    OrderCell,
    SecondRow,
    UserCell,
    HandleDelete
} from "./detailElements"
import styles from "../../../CommonUser/orderDetail/tableDetail.module.scss"
import { Link, useParams } from "react-router-dom"
import { getUserOrderbyID } from "../../../../redux/actions/async"
import { useDispatch, useSelector } from "react-redux"
import { AiFillEdit, AiFillDelete, AiFillCheckSquare } from "react-icons/ai"
import { MdOutlineCancelPresentation } from "react-icons/md"
import axios from "axios"
import swal from "sweetalert"
import useDelete from "../../../CustomHooks/useDelete"

export default function OrderAdminDetail() {
    const params = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const [isSend, setIsSend] = useState(false)
    const order = useSelector((state) => state.orders)
    const dispatch = useDispatch()
    const [newStatus, setNewStatus] = useState(false)
    const { handleDelete } = useDelete(dispatch)

    const handleEdit = () => {
        setIsEdit(!isEdit)
    }
    const handleChange = (e) => {
        setNewStatus(e.target.value)
    }
    const handleUpdate = async () => {
        try {
            await axios.patch(
                `${process.env.REACT_APP_BACK_URL}/api/v1/orders?id=${params.orderID}&status=${newStatus}`
            )
            swal({
                title: "The order is updated correctly",
                text: "Continuos!",
                icon: "success"
            })
        } catch (e) {
            swal({
                title: "The order could not be updated",
                text: "Continuos",
                icon: "error"
            })
        }
        setIsEdit(false)
        setIsSend(true)
    }

    useEffect(() => {
        dispatch(getUserOrderbyID(params.orderID, true))
        setIsSend(false)
    }, [isSend])
    return (
        <GlobalContainer>
            <DetailsOrder>
                <FirstRow>
                    <OrderCell data-title="Order ID:">
                        {order.selected._id}
                    </OrderCell>
                    <OrderCell data-title="Order date:">
                        {order.selected.date &&
                            new Date(
                                order.selected.date.toString()
                            ).toDateString()}
                    </OrderCell>

                    {!isEdit ? (
                        <OrderCell data-title="Order status:">
                            {order.selected.status}
                            <AiFillEdit onClick={handleEdit} />
                        </OrderCell>
                    ) : (
                        <OrderCell data-title="Order status:">
                            <select name="select" onChange={handleChange}>
                                <option
                                    value={order.selected.status}
                                    selected
                                    disabled
                                    hidden
                                >
                                    {order.selected.status}
                                </option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <MdOutlineCancelPresentation
                                id="cancel"
                                onClick={handleEdit}
                            />
                            <AiFillCheckSquare
                                id="confirm"
                                onClick={handleUpdate}
                            />
                        </OrderCell>
                    )}
                </FirstRow>
                <SecondRow>
                    <UserCell data-title="User ID:">
                        {order.userSelected._id}
                    </UserCell>
                    <UserCell data-title="User Name:">
                        {order.userSelected.name}
                    </UserCell>
                    <UserCell data-title="User Email:">
                        {order.userSelected.email}
                    </UserCell>
                    <UserCell data-title="User Direccion:">
                        {order.userSelected.address}
                    </UserCell>
                </SecondRow>
                <HandleDelete>
                    <AiFillDelete
                        onClick={() => handleDelete("orders", params.orderID)}
                    />
                </HandleDelete>
            </DetailsOrder>
            <DetailsProducts>
                <div className={styles.table}>
                    <div className={styles.rowDetail} id={styles.header}>
                        <div className={styles.cell}>Product</div>
                        <div className={styles.cell}>Unit Price</div>
                        <div className={styles.cell}>Quantity</div>
                        <div className={styles.cell}>Date</div>
                        <div className={styles.cell}>SubTotal</div>
                    </div>
                    {order.selected.products &&
                        order.selected.products.map((p) => (
                            <Link
                                to={`/products/${p.id}`}
                                className={styles.rowDetail}
                                key={p._id}
                            >
                                <div
                                    className={styles.cell}
                                    data-title="Product"
                                >
                                    {p.name}
                                </div>
                                <div
                                    className={styles.cell}
                                    data-title="Unit Price"
                                >
                                    $ {p.price}
                                </div>
                                <div
                                    className={styles.cell}
                                    data-title="Quantity"
                                >
                                    {p.quantity}
                                </div>
                                <div className={styles.cell} data-title="Date">
                                    {new Date(
                                        order.selected.date.toString()
                                    ).toDateString()}
                                </div>
                                <div
                                    className={styles.cell}
                                    data-title="SubTotal"
                                >
                                    $ {p.subTotal}
                                </div>
                            </Link>
                        ))}

                    <div className={styles.rowDetail} id={styles.footer}>
                        <div className={styles.cell}>TOTAL</div>
                        <div className={styles.cell}></div>
                        <div className={styles.cell}></div>
                        <div className={styles.cell}></div>
                        <div className={styles.cell}>
                            $/ {order.selected.total}
                        </div>
                    </div>
                </div>
            </DetailsProducts>
        </GlobalContainer>
    )
}
