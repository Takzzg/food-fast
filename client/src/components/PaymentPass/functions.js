export const getTotal = (array) => {
    let acc = 0; 
    for (let i = 0; i < array.length; i++) {
        acc = acc + Number(array[i].quantity)*Number(array[i].price); 
    }
    return acc
}