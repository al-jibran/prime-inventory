import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useField } from "formik";
import { View, Pressable, Keyboard } from "react-native";
import styled from "styled-components/native";
import DropDownPicker from "react-native-dropdown-picker";

import { SubText } from "./Text";
import Theme from "../theme";

// Check styled documentation

const TextInputStyle = styled.View`
  width: ${(props) => props.width || "100%"};
`;

const TextFieldStyle = styled.TextInput`
  border-bottom-color: black;
  border-bottom-width: 1px;
`;

const NumberFieldStyle = styled(TextFieldStyle)`
  text-align: center;
  width: 35%;
`;

const NumberInputStyle = styled.View`
  flex-direction: row;
`;

export const TextInput = ({ name, width, ...props }) => {
  const [field, fieldMeta, fieldHelpers] = useField(name);
  const showError = fieldMeta.touched && fieldMeta.error;

  return (
    <TextInputStyle width={width}>
      <TextFieldStyle
        value={field.value}
        onChangeText={(text) => fieldHelpers.setValue(text)}
        onBlur={() => fieldHelpers.setTouched(true)}
        {...props}
      />
      {showError && (
        <SubText color="red" style={{ flexDirection: "column" }}>
          {fieldMeta.error}
        </SubText>
      )}
    </TextInputStyle>
  );
};

export const NumberInput = ({ name, min, max, ...props }) => {
  const [field, fieldMeta, fieldHelpers] = useField(name);
  const showError = fieldMeta.touched && fieldMeta.error;

  const increment = () => {
    let value = parseInt(field.value) + 1;
    if (value > max) {
      value = max;
    }
    !isNaN(value) && fieldHelpers.setValue(value.toString());
  };

  const decrement = () => {
    let value = parseInt(field.value) - 1;
    if (value < min || (value < 1 && value > 0)) {
      value = min;
    }
    !isNaN(value) && fieldHelpers.setValue(value.toString());
  };

  return (
    <View>
      <NumberInputStyle>
        <Pressable onPress={decrement}>
          <Ionicons
            name="remove-circle-outline"
            size={22}
            color={Theme.color.danger}
          />
        </Pressable>

        <NumberFieldStyle
          value={field.value}
          onChangeText={(text) => fieldHelpers.setValue(text)}
          onBlur={() => fieldHelpers.setTouched(true)}
          clearTextOnFocus
          {...props}
        />

        <Pressable onPress={increment}>
          <Ionicons
            name="add-circle-outline"
            size={22}
            color={Theme.color.danger}
          />
        </Pressable>
      </NumberInputStyle>

      {showError && <SubText color="red">{fieldMeta.error}</SubText>}
    </View>
  );
};

export const DropDownInput = ({ name, items, setItems, direction }) => {
  const [field, , fieldHelpers] = useField(name);
  const [open, setOpen] = useState(false);

  // function for setValue with formik.
  const setValue = (state) => {
    let newState = state;

    if (typeof state === "function") {
      newState = state(field.value);
    }
    fieldHelpers.setValue(newState);
  };

  return (
    <DropDownPicker
      open={open}
      value={field.value}
      items={items}
      setItems={setItems}
      setValue={setValue}
      setOpen={setOpen}
      itemSeparator={true}
      selectedItemLabelStyle={{ fontWeight: "bold" }}
      dropDownDirection={direction}
      onPress={Keyboard.dismiss}
      style={{ height: 25 }}
      containerStyle={{ width: 80 }}
      textStyle={{ fontSize: 11 }}
    />
  );
};
