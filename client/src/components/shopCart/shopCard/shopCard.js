import React, { useEffect, useState } from "react"
import {
    FifthColumn,
    FirstColumn,
    FourthColumn,
    MainContainer,
    SecondColumn,
    ThirdColumn
} from "./cardElements"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { add_item_car, remove_item_car } from "../../../redux/actions/sync"
import { TbShoppingCartOff } from "react-icons/tb"
import axios from "axios"

export default function ShopProductCard({ product, setCharge, charge, user }) {
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()
    const addItem = async () => {
        if (quantity < product.stock) {
            dispatch(add_item_car(product))
            if (user) {
                await axios.post(
                    `${process.env.REACT_APP_BACK_URL}/api/v1/user/shopCart/add/${user.user._id}`,
                    {
                        product: product
                    }
                )
            }
            setQuantity(Number(quantity) + 1)
            setCharge(!charge)
        } else {
            alert(
                `EL producto solo tiene ${product.stock} unidades de stock, por lo que no puedes comprar más.`
            )
        }
    }
    const removeItem = async (all = false) => {
        if (quantity > 0 && !all) {
            if (user) {
                await axios.post(
                    `${process.env.REACT_APP_BACK_URL}/api/v1/user/shopCart/remove/${user.user._id}`,
                    {
                        product: product
                    }
                )
            }
            dispatch(remove_item_car(product))
            setQuantity(Number(quantity) - 1)
        } else {
            if (user) {
                await axios.post(
                    `${process.env.REACT_APP_BACK_URL}/api/v1/user/shopCart/removeSame/${user.user._id}`,
                    {
                        product: product
                    }
                )
            }
            dispatch(remove_item_car(product, true))
            setQuantity(0)
        }
        setCharge(!charge)
    }

    useEffect(() => {
        setQuantity(product.quantity)
    }, [])

    return (
        <MainContainer>
            <FirstColumn>
                <img
                    src={product.image && product.image.secure_url}
                    alt="product"
                />
            </FirstColumn>

            <SecondColumn>{product.name}</SecondColumn>

            <ThirdColumn>
                <div>
                    <AiFillMinusCircle
                        id="remove"
                        onClick={() => removeItem()}
                    />
                    {product.quantity}
                    <AiFillPlusCircle id="add" onClick={addItem} />
                </div>
                <div>
                    <TbShoppingCartOff
                        id="remove_all"
                        onClick={() => removeItem(true)}
                    />
                </div>
            </ThirdColumn>

            <FourthColumn>$/ {product.price}</FourthColumn>

            <FifthColumn>$/ {product.price * product.quantity}</FifthColumn>
        </MainContainer>
    )
}
