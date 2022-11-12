// add to cart
export const addToCart=(item)=>{
    return {
        type:'ADD_CART',
        payload:item
    }
}
// remove to cart
export const deleteToCart =(id)=>{
    return {
        type:'REMOVE_CART',
        payload:id
    }
}
// remove indivisual item
export const remove =(iteam)=>{
    return {
        type:'RMV_ONE',
        payload: iteam
    }
}