import React, { useState } from "react";
import styled, { css } from "styled-components/native";
import { useNavigation } from "@react-navigation/core";
import { View } from "react-native";
import FormHandler from "../Form";
import { Text } from "../Text";
import Theme from "../../theme";
import { FieldStyle } from "../../styles/common";

const Button = styled.Pressable`
  width: 19px;
  height: 19px;
  border: 3px solid white;
  border-radius: 50px;
`;

const RadioButton = styled.View`
  width: 22px;
  height: 22px;
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
      <FieldStyle layout="horizontal">
        <Text>Newest</Text>
        <RadioButton clicked={!clicked}>
          <Button
            onPress={() => {
              setClicked(!clicked);
            }}
          />
        </RadioButton>
      </FieldStyle>
      <FieldStyle layout="horizontal">
        <Text>Oldest</Text>
        <RadioButton clicked={clicked}>
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
