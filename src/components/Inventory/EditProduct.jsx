import React from "react";
import { useApolloClient, useMutation, gql } from "@apollo/client";

import FormHandler from "../Form";
import { UPDATE_PRODUCT } from "../../graphql/queries";
import { useDropDown } from "../../hooks/useDropDown";
import { useNavigation } from "@react-navigation/native";
import ProductForm, { productSchema } from "./ProductForm";

const EditProduct = ({ id }) => {
  const navigation = useNavigation();
  const [editProduct] = useMutation(UPDATE_PRODUCT);
  const { getValueForItem } = useDropDown("units");
  const client = useApolloClient();

  const { name, brand } = client.readFragment({
    id: `Product:${id}`,
    fragment: gql`
      fragment EditFragment on Product {
        name
        brand
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

    const change = { name, brand, stock, comment };

    editProduct({ variables: { id, change } });

    navigation.navigate("Home");
  };

  const onReset = () => {
    navigation.navigate("Home");
  };

  return (
    <FormHandler
      initialValue={initialValue}
      heading="Edit product"
      FormView={ProductForm}
      onReset={onReset}
      onSubmit={onSubmit}
      validationSchema={productSchema}
    />
  );
};

export default EditProduct;
