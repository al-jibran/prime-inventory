import React from 'react';
import FormHandler from './Form';

const initialValue = {
  name: '',
  stock: '0',
  brand: '',
  comment: '',
  unit: 'pc'
};

const AddProduct = ({ setVisible, refreshData, data }) => {
  const onSubmit = ({ name, stock, brand, unit }) => {
    let factor = 1;
    if (unit === 'box') {
      factor = 20;
    }

    stock = stock * factor;

    console.log(stock);
    data.push({ product: name, brand, stock, id: (data.length + 1) });
    setVisible(false);
    refreshData(true);
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