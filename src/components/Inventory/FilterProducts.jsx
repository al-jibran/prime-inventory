import React, { useState } from "react";
import styled, { css } from "styled-components/native";
import { useNavigation } from "@react-navigation/core";
import { View } from "react-native";
import FormHandler from "../Form";
import { SubHeading, Text } from "../Text";
import Theme from "../../theme";
import { FieldStyle } from "../../styles/common";

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

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <FormHandler onReset={onCancel} heading="Filters">
      <FormView />
    </FormHandler>
  );
};

const FormView = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <View>
      <SubHeading>Order By</SubHeading>
      <FieldStyle layout="horizontal">
        <Text>Created</Text>
        <RadioButton clicked={!clicked}>
          <Button
            onPress={() => {
              setClicked(!clicked);
            }}
          />
        </RadioButton>
      </FieldStyle>
      <FieldStyle layout="horizontal">
        <Text>Name</Text>
        <RadioButton clicked={clicked}>
          <Button
            onPress={() => {
              setClicked(!clicked);
            }}
          />
        </RadioButton>
      </FieldStyle>
      <SubHeading>Order Direction</SubHeading>
      <FieldStyle layout="horizontal">
        <Text>Ascending</Text>
        <RadioButton clicked={clicked}>
          <Button
            onPress={() => {
              setClicked(!clicked);
            }}
          />
        </RadioButton>
      </FieldStyle>
      <FieldStyle layout="horizontal">
        <Text>Descending</Text>
        <RadioButton clicked={!clicked}>
          <Button
            onPress={() => {
              setClicked(!clicked);
            }}
          />
        </RadioButton>
      </FieldStyle>
    </View>
  );
};

export default FilterProducts;
