import React from 'react';
import { useField } from 'formik';
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

const InputField = ({ label, name, type, ...props }) => {
    const [field, fieldMeta, fieldHelpers] = useField(name);
    const showError = fieldMeta.touched && fieldMeta.error;
    return (
        <View>
            <Field>
                <Text>{label}</Text>
                    <TextInputStyle 
                    value={field.value} 
                    onChangeText={text => fieldHelpers.setValue(text)} 
                    onBlur={() => fieldHelpers.setTouched(true)} 
                    keyboardType={type === "number" ? "numeric": "default"}
                    {...props} />

            </Field>
            {showError && <SubText color="red">{fieldMeta.error}</SubText>}
        </View>
    );
};

export default InputField;