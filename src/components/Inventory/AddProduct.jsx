import React from "react";
import { useMutation } from "@apollo/client";

import FormHandler from "./Form";
import { useDropDown } from "../../hooks/useDropDown";
import { CREATE_PRODUCT, GET_INVENTORY } from "../../graphql/queries";

const initialValue = {
  name: "",
  stock: "0",
  brand: "",
  comment: "",
  unit: "pcs",
};

const AddProduct = ({ setVisible }) => {
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_INVENTORY }],
  });

  const { getValueForItem } = useDropDown("units");

  const onSubmit = async ({ name, stock, brand, unit, comment }) => {
    const unitValue = getValueForItem(unit);
    stock *= unitValue;
    const product = { name, brand, stock, comment };

    createProduct({ variables: { product } });
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
      heading="Add a product"
    />
  );
};

export default AddProduct;
