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

const NumberInputStyle = styled(TextInputStyle)`
    width: 40px;
    flex-grow: 0;
    text-align: center;
`;

const InputField = ({ label, type, ...props }) => {
    const InputArea = ({ type, props }) => {
        switch (type) {
            case 'text': return <TextInputStyle {...props} />;
            case 'number': return (
                <View style={({flexDirection: 'row', marginLeft: 15})}>
                    <Pressable onPress={null}><Text>+</Text></Pressable>
                    <NumberInputStyle {...props} keyboardType={'numeric'} />
                    <Pressable onPress={null}><Text>-</Text></Pressable>
                </View>
            );
        }
        return null;
    };

    return (
        <Field>
            <Text>{label}</Text>
            <InputArea type={type} props={props} />
        </Field>
    );
};

export default InputField;