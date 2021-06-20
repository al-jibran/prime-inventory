import React, { useState } from 'react';
import { useField } from 'formik';
import { View, Pressable, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Text, SubText } from './Text';

// Check styled documentation

const TextInputStyle = styled.View`
  width: ${props => props.width || '100%'}; 
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

export const TextInput = ({ width, ...props }) => {
  const [field, fieldMeta, fieldHelpers] = useField(name);
  const showError = fieldMeta.touched && fieldMeta.error;

  return (
    <TextInputStyle width={width}>
      <TextFieldStyle
        value={field.value}
        onChangeText={text => fieldHelpers.setValue(text)}
        onBlur={() => fieldHelpers.setTouched(true)}
        {...props} />
      {showError && <SubText color="red" style={({ flexDirection: 'column' })}>{fieldMeta.error}</SubText>}
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
          <Text>-</Text>
        </Pressable>


        <NumberFieldStyle
          value={field.value}
          onChangeText={text => fieldHelpers.setValue(text)}
          onBlur={() => fieldHelpers.setTouched(true)}
          clearTextOnFocus
          {...props} />

        <Pressable onPress={increment}>
          <Text>+</Text>
        </Pressable>

      </NumberInputStyle>

      {showError && <SubText color="red">{fieldMeta.error}</SubText>}

    </View>
  );
};


export const DropDownInput = ({ name, items, setItems, direction }) => {
  const [field, , fieldHelpers] = useField(name);
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
      setItems={setItems}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={handleValueChange}
      dropDownDirection={direction}
      onPress={Keyboard.dismiss}
      style={({ height: 25 })}
      containerStyle={({ width: 80 })}
      textStyle={({ fontSize: 11 })}
    />
  );
};