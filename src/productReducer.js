export const initialState = [{
  id: 1,
  name: 'Product 1',
  brand: 'Brand A',
  stock: 5,
}, {
  id: 2,
  name: 'Product 2',
  brand: 'Brand B',
  stock: 1,
}, {
  id: 3,
  name: 'Product 3',
  brand: 'Brand C',
  stock: 13,
}, {
  id: 4,
  name: 'Product 4',
  brand: 'Brand A',
  stock: 2,
}, {
  id: 5,
  name: 'Product 5',
  brand: 'Brand B',
  stock: 10,
}];

export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS': return state;
    case 'ADD_PRODUCT': return state.concat(action.payload);
    case 'EDIT_PRODUCT': {
      const id = action.payload.id;
      let changed = action.payload.change;
      const { stock } = Object.prototype.hasOwnProperty.call(changed, 'stock') ? changed : 0;
      return state.map(product => {
        changed = { ...changed, stock: stock + product.stock };
        return product.id !== id ? product : { ...product, ...changed };
      });
    }
    case 'DELETE_PRODUCT': {
      return state.filter(product => product.id !== action.payload.id);
    }
    default: return state;
  }
};

export const getProducts = () => {
  return {
    type: 'GET_PRODUCTS',
  };
};

export const addProduct = (product) => {
  return {
    type: 'ADD_PRODUCT',
    payload: product,
  };
};

export const editProduct = (id, change) => {
  return {
    type: 'EDIT_PRODUCT',
    payload: {
      id,
      change
    },
  };
};

export const deleteProduct = (id) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: {
      id
    }
  };
};