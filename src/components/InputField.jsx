import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { Text, SubText } from './Text';

// Check styled documentation
const Field = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const TextInputStyle = styled.TextInput`
  border-bottom-color: black;
  border-bottom-width: 1px;
  margin-left: 5px;
  width: 50%;
`;

const NumberInputStyle = styled(TextInputStyle)`
  text-align: center;
  width: 10%;
`;

const InputField = ({ label, type, touched, error, ...props }) => {
    return (
        <View>
            <Field>
                <Text>{label}</Text>
                {type === 'text' ?
                    <TextInputStyle {...props}/> :
                    <NumberInputStyle {...props} keyboardType="numeric" clearTextOnFocus/>
                }
            </Field>
            {touched && error ? (<SubText color="red">{error}</SubText>) : null}
        </View>
    );
};

export default InputField;