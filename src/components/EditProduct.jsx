import React, {useContext} from 'react';
import UnitStorageContext from '../contexts/UnitStorageContext';
import FormHandler from './Form';

const EditProduct = ({ setVisible, refreshData, data, products }) => {
    const initialValue = {
        name: data.product,
        stock: "0",
        brand: data.brand,
        comment: '',
        unit: 'pcs',
      };



  const unitStorage = useContext(UnitStorageContext);

  const onSubmit = async ({ name, stock, brand, unit }) => {
    const unitValueString = await unitStorage.getUnitValue(unit);
    const unitValue = parseInt(unitValueString);
    stock *= unitValue;

    const product = products.find(p => p.id === data.id);
    console.log(product);

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