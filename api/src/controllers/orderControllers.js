import mongoose from "mongoose"
import Order from "../models/order.js"




export const postOrder = async(req,res)=>{

        const {user,productId,...resto}=req.body
    
        const data={
            ...resto,
            user,
            productId
        }
        const newOrder=new Order(data)
        await newOrder.save()
        res.status(201).json({
            msg:"Orden creada con éxito"
        }); 


}
//función para admins
export const getAllOrders = async (req, res)=>{
    try{
        const allOrders = await Order.find()
        if(allOrders.length){
            return res.json(allOrders)
        }else{
            return res.status(404).send({error: "no se encontraron órdenes"});

        }
    }catch(e){
        console.log(e.message)
        res.status(500).send("Error de servidor en getAllOrders.")
    }

}

export const deleteOrderById = async (req,res)=>{
    try{
        const id = req.params.id;

        let isHex = /^[0-9A-F]{24}$/ig.test(id); //verificación que es un hex de 24 caracteres
        if(!isHex){
            return res.status(400).send("No es un ObjectId");
        }

        let Deleted = await Order.findByIdAndDelete(id);

        if (Deleted !== null) {
            res.send({
                msg: "Orden eliminada exitosamente.",
                value: Deleted
        })
        } else {
            res.status(404).send({msg: "No se encontró la categoría a eliminar."})
        }
    }catch(e){
        console.log(e.message);
        res.status(500).send("Error de servidor en deleteOrder");
    }
}

export const deleteCompletedOrders = async (req,res)=>{
    try{
        let Deleteds = await Order.deleteMany({status: "Completed"});
        if(Deleteds.deletedCount !== 0){
            res.send({
                msg: "Órdenes eliminadas con éxito.",
                deletedCount: Deleteds.deletedCount
            })
        }else{
            res.status(404).send({msg: "No se encontraron órdenes completas."})
        }
    }catch(e){
        console.log(e.message);
        res.status(500).send("Error de servidor en deleteOrders Completed");
    }
}

//función para Admin, que espera un id para buscar la orden y el nuevo estado por query
export const updateOrderStatus = async (req,res)=>{
    try{
        const {id, status} = req.query;
        if (!id || !status) return res.json({ error: "query invalid" });

        let resp = await Order.findByIdAndUpdate(id,{$set: {status: status}});
        console.log("El resp del update es: ",resp);
        res.send("Estado de orden actualizada.");
    }catch(e){
        console.log(e.message);
        res.status(500).send("Error de servidor en updateOrder.")
    }
}

// import Order from "../models/order.js"



export const getUserOrders = async (req, res) => {
    const {userID} = req.params; 
    const orders = await Order.find({user: userID});
    res.send(orders); 
}

export const deleteUserOrders = async (req,res)=> {
    const {orderID} = req.params; 
    const orders = await Order.findByIdAndRemove(orderID);
    res.send({ok: "ok"}); 
}

export const getOrderByID = async (req,res)=> {
    const {orderID} = req.params; 
    const order = await Order.findById(orderID)
    res.send(order)
}