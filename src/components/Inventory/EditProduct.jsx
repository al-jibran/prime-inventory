import React, { useContext } from 'react';
import UnitStorageContext from '../../contexts/UnitStorageContext';
import FormHandler from './Form';
import { useStore } from '../../contexts/StoreContext';
import { editProduct } from '../../productReducer';

const EditProduct = ({ setVisible, data }) => {
  const [, dispatch] = useStore();
  const unitStorage = useContext(UnitStorageContext);


  const initialValue = {
    name: data.name,
    stock: "0",
    brand: data.brand,
    comment: '',
    unit: 'pcs',
  };

  const onSubmit = async ({ name, stock, brand, unit }) => {
    const unitValueString = await unitStorage.getUnitValue(unit);
    const unitValue = parseInt(unitValueString);
    const changeBy = parseInt(stock);
    stock = data.stock + (changeBy * unitValue);

    dispatch(editProduct({ name, brand, stock, id: data.id }));

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