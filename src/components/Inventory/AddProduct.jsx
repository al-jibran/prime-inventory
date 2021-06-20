import React from 'react';
import FormHandler from './Form';
import { useStore } from '../../contexts/StoreContext';
import { addProduct } from '../../productReducer';
import { useDropDown } from '../../hooks/useDropDown';

const initialValue = {
  name: '',
  stock: '0',
  brand: '',
  comment: '',
  unit: 'pcs'
};

const AddProduct = ({ setVisible }) => {
  const [products, dispatch] = useStore();
  const { getValueForItem } = useDropDown('units');

  const onSubmit = async ({ name, stock, brand, unit }) => {
    const unitValue = getValueForItem(unit);
    stock *= unitValue;

    dispatch(addProduct({ name, brand, stock, id: (products.length + 1) }));
    setVisible(false);
  };

  const onReset = () => {
    setVisible(false);
  };

  return (
    <FormHandler 
    initialValue={initialValue} 
    onSubmit={onSubmit} 
    onReset={onReset}
    heading="Add a product" />
  );
};

export default AddProduct;