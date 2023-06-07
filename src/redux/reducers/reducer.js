const INIT_STATE = {  //this is our state, source of truth
  carts: []
}



const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'ADD_CART':

      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);

      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1
      } else {
        const temp = { ...action.payload, qnty: 1 }
        return {
          ...state,
          carts: [...state.carts, temp]
        }
      }
    // return {
    //     ...state,  //spread operator over object
    //     carts : [...state.carts,action.payload] //spread operator over array
    // }


    case 'RMV_CART':
      const data = state.carts.filter((el) => el.id !== action.payload);
      return {
        ...state,
        carts: data
      }

    case 'RMV_ONE':
      const itemIndex_dec = state.carts.findIndex((item) => item.id === action.payload.id);

      if (state.carts[itemIndex_dec].qnty >= 1) {
        let dltItem = state.carts[itemIndex_dec].qnty -= 1
        console.log([...state.carts,dltItem])

        return {
          ...state,
          carts: [...state.carts]
        }
      }

      // else if (state.carts[itemIndex_dec].qnty == 1) {
      //   const data = state.carts.filter((item) => item.id !== action.payload);
      //   return {
      //     ...state,
      //     carts: data
      //   }
      // }

    default:
      return state
  }
}

export default cartReducer