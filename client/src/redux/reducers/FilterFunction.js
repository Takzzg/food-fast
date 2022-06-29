

export default function FilterFunction (products, filtersOptions){ 

    const {categories, price, rating, stock} = filtersOptions; 
    // Filtro por categorías 
    let newProducts = products.filter(el=> {
        let counter = 0; 
        for (let i = 0; i < categories.length; i++) {
          for (let j = 0; j < el.categories.length; j++){
            if(categories[i] === el.categories[j]){
                counter = counter + 1; 
            }
          }
        }
        if (counter === categories.length) return true 
        return false 
    })
    // Filtro por precio 1--> Asc || -1--> Desc
    if (price !== null) {
        if (price === "1") {
        newProducts = newProducts.sort((prev,curr)=> prev.price - curr.price)
        } else {
        newProducts  = newProducts.sort((prev,curr) => curr.price - prev.price)
        }
    }
 


    // Filtro por raiting
    if(rating !== null) {
        newProducts = newProducts.filter(el=> Math.round(el.rating) === rating)
    }

    // Filtro por stock, primero si el stock es 0 no se muestra 
    newProducts = newProducts.filter(el=> el.stock>0 && el); 

    // Filtro por stock en función a lo ingresado
    if (stock !== null) {
         if(stock === "1"){
            newProducts = newProducts.slice().sort((prev,curr)=> prev.stock - curr.stock); 
        } else {
            newProducts = newProducts.slice().sort((prev,curr)=> curr.stock - prev.stock); 
        }
    }
 
    
    return newProducts; 
}
