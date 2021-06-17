import React, {useContext} from 'react';
import UnitStorageContext from '../contexts/UnitStorageContext';
import FormHandler from './Form';

const EditProduct = ({ setVisible, refreshData, data, items }) => {
    const initialValue = {
        name: data.product,
        stock: (data.stock).toString(),
        brand: data.brand,
        comment: '',
        unit: 'pcs',
      };

  const unitStorage = useContext(UnitStorageContext);

  const onSubmit = async ({ name, stock, brand, unit }) => {
    const unitValueString = await unitStorage.getUnitValue(unit);
    const unitValue = parseInt(unitValueString);
    console.log(unitValue);
    stock *= unitValue;

    console.log(name, stock, brand, unit);
    setVisible(false);
    // refreshData(true);
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