import React from 'react';
import { View, TextInput, Pressable, useWindowDimensions } from 'react-native';
import styled from 'styled-components';
import { Text, SubText } from './Text';

// Check styled documentation
const Field = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const TextInputStyle = styled.TextInput`
  border-bottom-color: black;
  border-bottom-width: 1px;
  margin-left: 5px;
`;

const InputField = ({ label, type, touched, error,...props }) => {
    return (
        <View>
        <Field>
            <Text>{label}</Text>
            <TextInputStyle
                {...props}
                keyboardType={type === "number" ? "numeric" : "default"}
                />
        </Field>
        {touched && error ? (<SubText color="red">{error}</SubText>) : null}
        </View>
    );
};

export default InputField;