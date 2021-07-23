import React from "react";
import { useApolloClient, useMutation, gql } from "@apollo/client";

import FormHandler from "../Form";
import { UPDATE_PRODUCT } from "../../graphql/queries";
import { useDropDown } from "../../hooks/useDropDown";
import { useNavigation } from "@react-navigation/native";
import ProductForm, { productSchema } from "./ProductForm";
import { Alert } from "react-native";

const EditProduct = ({ id }) => {
  const navigation = useNavigation();
  const [editProduct] = useMutation(UPDATE_PRODUCT);
  const { getValueForItem } = useDropDown("units");
  const client = useApolloClient();

  const {
    name,
    brand,
    stock: currentStock,
  } = client.readFragment({
    id: `Product:${id}`,
    fragment: gql`
      fragment EditFragment on Product {
        name
        brand
        stock
      }
    `,
  });

  const initialValue = {
    name: name,
    stock: "0",
    brand: brand,
    comment: "",
    unit: "pcs",
  };

  const onSubmit = async ({ name, stock, brand, comment, unit }) => {
    const unitValue = getValueForItem(unit);
    const changeBy = parseInt(stock);
    stock = changeBy * unitValue;
    console.log(currentStock);
    console.log(currentStock + stock);

    if (currentStock + stock < 0) {
      Alert.alert("Stock", `The stock cannot be reduced below zero.`);
      return;
    }

    const change = { name, brand, stock, comment };

    editProduct({ variables: { id, change } });

    navigation.goBack();
  };

  const onReset = () => {
    navigation.goBack();
  };

  return (
    <FormHandler
      initialValue={initialValue}
      heading="Edit product"
      onReset={onReset}
      onSubmit={onSubmit}
      validationSchema={productSchema}
    >
      <ProductForm />
    </FormHandler>
  );
};

export default EditProduct;
