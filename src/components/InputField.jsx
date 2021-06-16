import React, { useState } from 'react';
import { useField } from 'formik';
import { View, Pressable } from 'react-native';
import styled from 'styled-components';
import DropDownPicker from 'react-native-dropdown-picker';

import { Text, SubText } from './Text';

// Check styled documentation

const TextInputStyle = styled.View`
  width: 50%; 
`;

const TextFieldStyle = styled.TextInput`
  border-bottom-color: black;
  border-bottom-width: 1px;
`;

const NumberFieldStyle = styled(TextFieldStyle)`
  text-align: center; 
  width: 30%;
`;

const NumberInputStyle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
`;

export const TextInput = ({ name, ...props }) => {
  const [field, fieldMeta, fieldHelpers] = useField(name);
  const showError = fieldMeta.touched && fieldMeta.error;

  return (
    <TextInputStyle>
      <TextFieldStyle
        value={field.value}
        onChangeText={text => fieldHelpers.setValue(text)}
        onBlur={() => fieldHelpers.setTouched(true)}
        keyboardType="numeric"
        {...props} />

      {showError && <SubText color="red" style={({ flexDirection: 'column' })}>{fieldMeta.error}</SubText>}
    </TextInputStyle>
  );
};


export const NumberInput = ({ name, ...props }) => {
  const [field, fieldMeta, fieldHelpers] = useField(name);
  const showError = fieldMeta.touched && fieldMeta.error;

  const increment = () => fieldHelpers.setValue((parseInt(field.value) + 1).toString());
  const decrement = () => fieldHelpers.setValue((parseInt(field.value) - 1).toString());

  return (
    <View>
      <NumberInputStyle>

        <Pressable onPress={increment}>
          <Text>+</Text>
        </Pressable>

        <NumberFieldStyle
          value={field.value}
          onChangeText={text => fieldHelpers.setValue(text)}
          onBlur={() => fieldHelpers.setTouched(true)}
          keyboardType="numeric"
          clearTextOnFocus
          {...props} />

        <Pressable onPress={decrement}>
          <Text>-</Text>
        </Pressable>
      </NumberInputStyle>

      {showError && <SubText color="red">{fieldMeta.error}</SubText>}

    </View>
  );
};


export const DropDownInput = ({ name, items, setItems }) => {
  const [field, fieldMeta, fieldHelpers] = useField(name);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(field.value);


  const handleValueChange = (value) => {
    fieldHelpers.setValue(value);
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={handleValueChange}
      style={({ height: 20})}
      containerStyle={({ width: 80 })}
      textStyle={({ fontSize: 11 })}
    />
  );
};