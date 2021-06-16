import React from 'react';
import { useField } from 'formik';
import { View, Pressable } from 'react-native';
import styled from 'styled-components';
import { Text, SubText } from './Text';

// Check styled documentation
const FieldStyle = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const TextFieldStyle = styled.TextInput`
  border-bottom-color: black;
  border-bottom-width: 1px;
  margin-left: 5px;
  width: 50%;
`;

const NumberFieldStyle = styled(TextFieldStyle)`
  text-align: center; 
  width: 30%;
`;

const NumberInputStyle = styled.View`
  flex-direction: row;
  align-self: flex-end;
  justify-content: flex-end;
`;

export const TextInput = ({ label, name, ...props }) => {
  const [field, fieldMeta, fieldHelpers] = useField(name);
  const showError = fieldMeta.touched && fieldMeta.error;
  return (
    <View>
      <FieldStyle>
        <Text>{label}</Text>
        <TextFieldStyle
          value={field.value}
          onChangeText={text => fieldHelpers.setValue(text)}
          onBlur={() => fieldHelpers.setTouched(true)}
          keyboardType="numeric"
          {...props} />

      </FieldStyle>
      {showError && <SubText color="red">{fieldMeta.error}</SubText>}
    </View>
  );
};


export const NumberInput = ({ label, name, ...props }) => {
  const [field, fieldMeta, fieldHelpers] = useField(name);
  const showError = fieldMeta.touched && fieldMeta.error;

  const increment = () => fieldHelpers.setValue((parseInt(field.value) + 1).toString());
  const decrement = () => fieldHelpers.setValue((parseInt(field.value) - 1).toString());

  return (
    <View>
      <FieldStyle>
        <Text>{label}</Text>
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

      </FieldStyle>
      {showError && <SubText color="red">{fieldMeta.error}</SubText>}
    </View>
  );
};