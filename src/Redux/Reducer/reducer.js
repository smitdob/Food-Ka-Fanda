const initSate = {
    carts: []
}
export const chartReducer = (state = initSate, action) => {
    switch (action.type) {
        case "ADD_CART":
            const ItemIndex = state.carts.findIndex((iteam) => iteam.id === action.payload.id);
            if (ItemIndex >= 0) {
                state.carts[ItemIndex].qnty += 1
            }
            else {
                const temp = { ...action.payload, qnty: 1 }
                return {
                    ...state,
                    carts: [...state.carts, temp]
                }
            }

        case 'REMOVE_CART':
            const data = state.carts.filter((el) => el.id !== action.payload);
            return {
                ...state,
                carts: data
            }

        case 'RMV_ONE':
            const ItemIndex_dec = state.carts.findIndex((iteam) => iteam.id === action.payload.id);
            if (state.carts[ItemIndex_dec].qnty >= 1) {
                const dltItem = state.carts[ItemIndex_dec].qnty -= 1
                console.log(...state.carts,dltItem);

                return {
                    ...state,
                    carts: [...state.carts]
                }
            }
            else if (state.carts[ItemIndex_dec].qnty === 1) {
                const data = state.carts.filter((el) => el.id !== action.payload);
                return{
                    ...state,
                    carts:data
                }
            }


        default:
            return state
    }
}