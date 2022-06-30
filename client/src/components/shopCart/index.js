import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  TitleMainContainer,
  GlobalContainer,
  TablesContainer,
  ShopContainer,
  OrderContainer,
  Header,
  OrderRealContainer
} from "./displayElements";
import OrdenSumary from "./orderResume";
import ShopProductCard from "./shopCard/shopCard";

export default function ShoppingCart() {
  const products = useSelector((state) => state.shopCart.shopCart);
  const user = useSelector((state)=> state.user.authData); 
  const theme = useSelector(state=>state.theme.selectedTheme)
  const [items, setItems] = useState(1);
  const [subTotal, setSubTotal] = useState(1); 
  const [charge, setCharge] = useState(false); 

  useEffect(()=> {
    const actualice = (p) => {
      let newArray = p.map(el=> {return {quantity: el.quantity, totalPrice: el.quantity*el.price}})
      let valueItems= newArray.reduce((prev, curr) => prev= prev + curr.quantity ,0)
       setItems(valueItems)
      
      let priceSum = newArray.reduce((prev, curr) => prev= prev + curr.totalPrice,0)
      setSubTotal(priceSum)}
    actualice(products)
  }, [charge])

  return (
    <GlobalContainer>
      <TitleMainContainer theme={theme}>TU CARRITO</TitleMainContainer>

      <TablesContainer theme={theme}>
        <ShopContainer theme={theme}>
          <div id="containerMain">
            <Header theme={theme}>
              <div id="product">Tu Pedido</div>
              <div id="quantity">CANTIDAD</div>
              <div id="price">PRECIO/U</div>
              <div id="total">TOTAL</div>
            </Header>

              {products.map(p=><ShopProductCard key={p._id} product={p} setCharge={setCharge} charge={charge} user={user}/>  )}
          </div> 
        </ShopContainer>

        <OrderContainer theme={theme}>
          <OrderRealContainer theme={theme}>
             <OrdenSumary products={products} items={items} subTotal={subTotal}/>
          </OrderRealContainer>
        </OrderContainer>
      </TablesContainer>
    </GlobalContainer>
  );
}
