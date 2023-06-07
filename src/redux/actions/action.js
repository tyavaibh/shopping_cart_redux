const ADD = (item) => {
  return {
    type : 'ADD_CART',
    payload : item
  }
}

export default ADD;

export const DLT = (id) => {
  return {
    type : 'RMV_CART',
    payload : id
  }
}


export const REMOVE = (item) => {
  return {
    type : 'RMV_ONE',
    payload : item
  }
}

