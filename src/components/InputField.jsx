import React from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components';
import { Text } from './Text';

// Check styled documentation
const Field = styled.View`
    display: flex;
    flex-direction: row;
    margin: 10px auto;
`;

const InputField = ({label, type, ...props}) => {
    return (
        <Field>
            <Text>{label}</Text>
            <TextInput {...props} style={({borderBottomColor: 'black', borderBottomWidth: 1, flexGrow: 1, marginLeft: 5})}/>
        </Field>
    );
};

export default InputField;