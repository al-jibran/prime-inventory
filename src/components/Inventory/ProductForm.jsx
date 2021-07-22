import React from "react";
import { Pressable, View } from "react-native";
import * as yup from "yup";

import { Text } from "../Text";
import { useDropDown } from "../../hooks/useDropDown";
import { TextInput, NumberInput, DropDownInput } from "../InputField";
import { FieldStyle, FormActions } from "../../styles/common";
import Theme from "../../theme";

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
    .matches("^[0-9\\-]+$", "Enter valid numbers")
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

const ProductForm = ({ handleReset, handleSubmit }) => {
  const { items, setItems } = useDropDown("units");

  return (
    <View>
      <FieldStyle layout="horizontal">
        <Text>Name</Text>
        <TextInput name="name" autoCapitalize="words" width="50%" />
      </FieldStyle>

      <FieldStyle layout="horizontal">
        <Text>Stock</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <NumberInput name="stock" />
          <DropDownInput
            name="unit"
            items={items}
            setItems={setItems}
            direction="TOP"
          />
        </View>
      </FieldStyle>

      <FieldStyle layout="horizontal">
        <Text>Brand</Text>
        <TextInput name="brand" autoCapitalize="words" width="50%" />
      </FieldStyle>

      <FieldStyle layout="horizontal">
        <Text>Comment</Text>
        <TextInput name="comment" width="50%" />
      </FieldStyle>

      <FormActions width="30">
        <Pressable onPress={handleReset}>
          <Text>Cancel</Text>
        </Pressable>
        <Pressable onPress={handleSubmit}>
          <Text color={Theme.color.danger}>Save</Text>
        </Pressable>
      </FormActions>
    </View>
  );
};

export default ProductForm;
