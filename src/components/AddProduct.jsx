import React, {useContext} from 'react';
import UnitStorageContext from '../contexts/UnitStorageContext';
import FormHandler from './Form';
import { useStore } from '../contexts/StoreContext';
import { addProduct } from '../productReducer';

const initialValue = {
  name: '',
  stock: '0',
  brand: '',
  comment: '',
  unit: 'pcs'
};

const AddProduct = ({ setVisible }) => {
  const unitStorage = useContext(UnitStorageContext);
  const [products, dispatch] = useStore();

  const onSubmit = async ({ name, stock, brand, unit }) => {
    const unitValueString = await unitStorage.getUnitValue(unit);
    const unitValue = parseInt(unitValueString);
    stock *= unitValue;

    dispatch(addProduct({ product: name, brand, stock, id: (products.length + 1) }));
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