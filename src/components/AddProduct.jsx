import React from 'react';
import Form from './Form';

const initialValue = {
  name: '',
  stock: '0',
  brand: '',
  comment: '',
};

const AddProduct = ({ setVisible, refreshData, data }) => {
  const onSubmit = ({ name, stock, brand }) => {
    data.push({ product: name, brand, stock, id: (data.length + 1) });
    setVisible(false);
    refreshData(true);
  };

  const onReset = () => {
    setVisible(false);
  };

  return (
    <Form 
    initialValue={initialValue} 
    onSubmit={onSubmit} 
    onReset={onReset}
    heading="Add a product" />
  );
};

export default AddProduct;