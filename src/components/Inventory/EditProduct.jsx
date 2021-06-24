import React from "react";
import { useMutation } from "@apollo/client";

import FormHandler from "./Form";
import { UPDATE_PRODUCT } from "../../graphql/queries";
import { useDropDown } from "../../hooks/useDropDown";

const EditProduct = ({ setVisible, data }) => {
  const [editProduct] = useMutation(UPDATE_PRODUCT);
  const { getValueForItem } = useDropDown("units");

  const initialValue = {
    name: data.name,
    stock: "0",
    brand: data.brand,
    comment: "",
    unit: "pcs",
  };

  const onSubmit = async ({ name, stock, brand, comment, unit }) => {
    const unitValue = getValueForItem(unit);
    const changeBy = parseInt(stock);
    stock = changeBy * unitValue;

    const product = { name, brand, stock, comment };
    console.log(data.id, product);

    editProduct({ variables: { id: data.id, product } });

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
      heading="Edit product"
    />
  );
};

export default EditProduct;
