import React, {useContext} from 'react';
import UnitStorageContext from '../contexts/UnitStorageContext';
import FormHandler from './Form';

const initialValue = {
  name: '',
  stock: '0',
  brand: '',
  comment: '',
  unit: 'pcs'
};

const AddProduct = ({ setVisible, refreshData, data }) => {
  const unitStorage = useContext(UnitStorageContext);

  const onSubmit = async ({ name, stock, brand, unit }) => {
    const unitValueString = await unitStorage.getUnitValue(unit);
    const unitValue = parseInt(unitValueString);
    stock *= unitValue;

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