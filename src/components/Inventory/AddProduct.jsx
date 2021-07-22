import React from "react";
import { useMutation } from "@apollo/client";

import FormHandler from "../Form";
import { useDropDown } from "../../hooks/useDropDown";
import { CREATE_PRODUCT, GET_INVENTORY } from "../../graphql/queries";
import { useNavigation } from "@react-navigation/native";
import ProductForm, { productSchema } from "./ProductForm";

const initialValue = {
  name: "",
  stock: "0",
  brand: "",
  comment: "",
  unit: "pcs",
};

const AddProduct = () => {
  const navigation = useNavigation();
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_INVENTORY }],
  });

  const { getValueForItem } = useDropDown("units");

  const onSubmit = async ({ name, stock, brand, unit, comment }) => {
    const unitValue = getValueForItem(unit);
    stock *= unitValue;
    const product = { name, brand, stock, comment };

    createProduct({ variables: { product } });
    navigation.navigate("Home");
  };

  const onReset = () => {
    navigation.navigate("Home");
  };

  return (
    <FormHandler
      initialValue={initialValue}
      heading="Add a product"
      onReset={onReset}
      onSubmit={onSubmit}
      validationSchema={productSchema}
    >
      <ProductForm />
    </FormHandler>
  );
};

export default AddProduct;
