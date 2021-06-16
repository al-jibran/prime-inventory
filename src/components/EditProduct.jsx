import React, {useContext} from 'react';
import UnitStorageContext from '../contexts/UnitStorageContext';
import FormHandler from './Form';

const EditProduct = ({ setVisible, refreshData, data, items }) => {
    const initialValue = {
        name: data.name,
        stock: data.stock,
        brand: data.brand,
        comment: '',
        unit: data.stock,
      };

  const unitStorage = useContext(UnitStorageContext);

  const onSubmit = async ({ name, stock, brand, unit }) => {
    const unitValueString = await unitStorage.getUnitValue(unit);
    const unitValue = parseInt(unitValueString);
    stock *= unitValue;

    items.push({ product: name, brand, stock, id: (data.length + 1) });
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
    heading="Edit product" />
  );
};

export default EditProduct;