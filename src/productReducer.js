export const initialState = [{
    id: 1,
    product: 'Product 1',
    brand: 'Brand A',
    stock: 5,
}, {
    id: 2,
    product: 'Product 2',
    brand: 'Brand B',
    stock: 1,
}, {
    id: 3,
    product: 'Product 3',
    brand: 'Brand C',
    stock: 13,
}, {
    id: 4,
    product: 'Product 4',
    brand: 'Brand A',
    stock: 2,
}, {
    id: 5,
    product: 'Product 5',
    brand: 'Brand B',
    stock: 10,
}];

export const reducer = (state, action) => {
    switch(action.type) {
        case 'GET_PRODUCTS': return state;
        case 'ADD_PRODUCT': return state.concat(action.payload);
        case 'EDIT_PRODUCT': {
            const product = action.payload;
            const newState = state.map(p => p.id !== product.id ? p : product);
            return newState;
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

export const editProduct = (product) => {
    return {
        type: 'EDIT_PRODUCT',
        payload: product,
    };
} ;