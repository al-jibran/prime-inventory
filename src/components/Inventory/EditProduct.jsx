import React from 'react';
import FormHandler from './Form';
import { useStore } from '../../contexts/StoreContext';
import { editProduct } from '../../productReducer';
import { useDropDown } from '../../hooks/useDropDown';

const EditProduct = ({ setVisible, data }) => {
  const [, dispatch] = useStore();
  const { getValueForItem } = useDropDown('units');

  const initialValue = {
    name: data.name,
    stock: "0",
    brand: data.brand,
    comment: '',
    unit: 'pcs',
  };

  const onSubmit = async ({ name, stock, brand, unit }) => {
    const unitValue = getValueForItem(unit);
    const changeBy = parseInt(stock);
    stock = changeBy * unitValue;

    dispatch(editProduct(data.id, { name, brand, stock }));

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
      heading="Edit product" />
  );
};

export default EditProduct;