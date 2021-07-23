import React from "react";
import { View } from "react-native";
import * as yup from "yup";

import { FieldTitle } from "../../components/Text";
import { useDropDown } from "../../hooks/useDropDown";
import {
  TextInput,
  NumberInput,
  DropDownInput,
} from "../../components/InputField";
import { FieldStyle, NumberDropDown } from "../../styles/common";

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name of the product is required")
    .matches(
      "^[a-zA-Z()0-9\\- ]+$",
      "Can only contain alpha numeric characters and parantheses"
    ),

  stock: yup
    .string()
    .required("Stock value is required")
    .matches("^[0-9\\-]+$", "Enter integer numbers")
    .default(0),

  brand: yup
    .string()
    .required("Brand of the product is required")
    .matches(
      "^[a-zA-Z()0-9\\- ]+$",
      "Can only contain alpha numeric characters and parantheses"
    ),

  comment: yup.string().required("Comment is required"),
});

const ProductForm = () => {
  const { items, setItems } = useDropDown("units");

  return (
    <View>
      <FieldStyle layout="horizontal">
        <FieldTitle>Name</FieldTitle>
        <TextInput name="name" autoCapitalize="words" width="50%" />
      </FieldStyle>

      <FieldStyle layout="horizontal">
        <FieldTitle>Stock</FieldTitle>
        <NumberDropDown>
          <NumberInput name="stock" />
          <DropDownInput
            name="unit"
            items={items}
            setItems={setItems}
            direction="TOP"
          />
        </NumberDropDown>
      </FieldStyle>

      <FieldStyle layout="horizontal">
        <FieldTitle>Brand</FieldTitle>
        <TextInput name="brand" autoCapitalize="words" width="50%" />
      </FieldStyle>

      <FieldStyle layout="horizontal">
        <FieldTitle>Comment</FieldTitle>
        <TextInput name="comment" width="50%" />
      </FieldStyle>
    </View>
  );
};

export default ProductForm;
