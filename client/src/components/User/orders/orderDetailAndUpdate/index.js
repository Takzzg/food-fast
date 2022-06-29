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

export default function OrderAdminDetail(params) {
    //no tenia nada los parentesis
    //const params= useParams(); params lo trae de la URL /:orderID
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
            // id=${params.orderID}
            await axios.patch(
                `${process.env.REACT_APP_BACK_URL}/api/v1/orders?id=${params.id}&status=${newStatus}`
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
        dispatch(getUserOrderbyID(params.id, true)) //aqui
        setIsSend(false)
    }, [isSend])
    return (
        <GlobalContainer>
            <DetailsOrder>
                <p>Orden</p>
                <FirstRow>
                    <OrderCell data-title="ID:">{order.selected._id}</OrderCell>
                    <OrderCell data-title="Fecha:">
                        {order.selected.date &&
                            new Date(
                                order.selected.date.toString()
                            ).toDateString()}
                    </OrderCell>

                    {!isEdit ? (
                        <OrderCell data-title="Estado:">
                            {order.selected.status}
                            <AiFillEdit onClick={handleEdit} />
                        </OrderCell>
                    ) : (
                        <OrderCell data-title="Cambiar estado: ">
                            <select name="select" onChange={handleChange}>
                                <option
                                    value={order.selected.status}
                                    selected
                                    disabled
                                    hidden
                                >
                                    {order.selected.status}
                                </option>
                                <option value="Pending">Pendiente</option>
                                <option value="Rejected">Rechazada</option>
                                <option value="Accepted">Aceptada</option>
                                <option value="Completed">Completa</option>
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
                <p>Usuario</p>
                <SecondRow>
                    <UserCell data-title="ID:">
                        {order.userSelected._id}
                    </UserCell>
                    <UserCell data-title="Nombre:">
                        {order.userSelected.name}
                    </UserCell>
                    <UserCell data-title="E-mail:">
                        {order.userSelected.email}
                    </UserCell>
                    <UserCell data-title="Dirección:">
                        {order.userSelected.address}
                    </UserCell>
                </SecondRow>
                <HandleDelete>
                    <span>Eliminar orden: </span>
                    <AiFillDelete
                        onClick={() => handleDelete("orders", params.id)}
                    />
                    {/* aquii */}
                </HandleDelete>
            </DetailsOrder>
            <DetailsProducts>
                <div className={styles.table}>
                    <div className={styles.rowDetail} id={styles.header}>
                        <div className={styles.cell}>Producto</div>
                        <div className={styles.cell}>Precio unitario</div>
                        <div className={styles.cell}>Cantidad</div>
                        {/* <div className={styles.cell}>
                    Fecha
                </div> */}
                        <div className={styles.cell}>SubTotal</div>
                    </div>
                    {order.selected.products &&
                        order.selected.products.map((p, i) => (
                            <Link
                                to={`/products/${p.id}`}
                                className={styles.rowDetail}
                                key={i}
                            >
                                <div
                                    className={styles.detailCell}
                                    data-title="Product"
                                >
                                    {p.name}
                                </div>
                                <div
                                    className={styles.detailCell}
                                    data-title="Unit Price"
                                >
                                    $ {p.price}
                                </div>
                                <div
                                    className={styles.detailCell}
                                    data-title="Quantity"
                                >
                                    {p.quantity}
                                </div>
                                {/* <div className={styles.cell} data-title="Date">
                    {new Date(order.selected.date.toString()).toDateString()}
                </div> */}
                                <div
                                    className={styles.detailCell}
                                    data-title="SubTotal"
                                >
                                    $ {p.subTotal}
                                </div>
                            </Link>
                        ))}

                    <div className={styles.rowDetail} id={styles.footer}>
                        <div className={styles.cell}>TOTAL</div>
                        {/* <div className={styles.cell} ></div>
                    <div className={styles.cell} ></div>
                    <div className={styles.cell} ></div> */}
                        <div className={styles.cell}>
                            $/ {order.selected.total}
                        </div>
                    </div>
                </div>
            </DetailsProducts>
        </GlobalContainer>
    )
}
