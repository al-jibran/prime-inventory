import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import styled from 'styled-components';
import { Text } from './Text';

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
  flex-grow: 1; 
  margin-left: 5px;
`;

const InputField = ({ label, type, ...props }) => {
    return (
        <Field>
            <Text>{label}</Text>
            <TextInputStyle
                {...props}
                keyboardType={type === "number" ? "numeric" : "default"}
                clearTextOnFocus />
        </Field>
    );
};

export default InputField;