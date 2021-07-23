import React from "react";
import { useField } from "formik";
import styled, { css } from "styled-components/native";
import { useNavigation } from "@react-navigation/core";
import { View } from "react-native";
import { useReactiveVar } from "@apollo/client";

import FormHandler from "../../components/Form";
import { SubHeading, Text } from "../../components/Text";
import Theme from "../../theme";
import { FieldStyle } from "../../styles/common";
import { productsOrder } from "../../../Cache";

const Button = styled.Pressable`
  width: 15px;
  height: 15px;
  border: 3px solid white;
  border-radius: 50px;
`;

const RadioButton = styled.View`
  width: 18px;
  height: 18px;
  border: 3px solid black;
  border-radius: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({ clicked }) => {
    if (clicked) {
      return css`
        border-color: ${Theme.color.danger};
        background-color: ${Theme.color.danger};
      `;
    }
  }}
`;

const FilterProducts = () => {
  const navigation = useNavigation();
  const initialValue = useReactiveVar(productsOrder);

  const onCancel = () => {
    navigation.goBack();
  };

  const onSubmit = ({ orderBy, orderDirection }) => {
    productsOrder({ orderBy, orderDirection });
    navigation.goBack();
  };

  return (
    <FormHandler
      onReset={onCancel}
      heading="Filters"
      initialValue={initialValue}
      onSubmit={onSubmit}
    >
      <FormView />
    </FormHandler>
  );
};

const FormView = () => {
  const [orderField, , orderFieldHelpers] = useField("orderBy");
  const [directionField, , directionHelpers] = useField("orderDirection");

  const orderBy = orderField.value;
  const orderDirection = directionField.value;

  return (
    <View>
      <View style={{ borderTopWidth: 1 }}>
        <SubHeading>Order By</SubHeading>
        <FieldStyle layout="horizontal">
          <Text>Created</Text>
          <RadioButton clicked={orderBy === "CREATED_AT"}>
            <Button
              onPress={() => {
                orderFieldHelpers.setValue("CREATED_AT");
              }}
            />
          </RadioButton>
        </FieldStyle>
        <FieldStyle layout="horizontal">
          <Text>Name</Text>
          <RadioButton clicked={orderBy === "NAME"}>
            <Button
              onPress={() => {
                orderFieldHelpers.setValue("NAME");
              }}
            />
          </RadioButton>
        </FieldStyle>
      </View>
      <View style={{ padding: 5, borderTopWidth: 1 }}>
        <SubHeading>Order Direction</SubHeading>
        <FieldStyle layout="horizontal">
          <Text>Ascending</Text>
          <RadioButton clicked={orderDirection === "ASC"}>
            <Button
              onPress={() => {
                directionHelpers.setValue("ASC");
              }}
            />
          </RadioButton>
        </FieldStyle>
        <FieldStyle layout="horizontal">
          <Text>Descending</Text>
          <RadioButton clicked={orderDirection === "DESC"}>
            <Button
              onPress={() => {
                directionHelpers.setValue("DESC");
              }}
            />
          </RadioButton>
        </FieldStyle>
      </View>
    </View>
  );
};

export default FilterProducts;
