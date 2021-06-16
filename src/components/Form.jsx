import React from 'react';
import styled from 'styled-components';
import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Heading, Text } from './Text';
import InputField from './InputField';
import Theme from '../theme';


const FormContainer = styled.View`
  background-color: white;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;  
  border-top-color: ${Theme.color.primary}; 
  border: 2px solid;
`;

const FormActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-end;
  width: 30%;
  margin-top: 10px;
`;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name of the product is required")
    .matches("^[a-zA-Z()0-9 ]+$", "Can only contain alpha numeric characters and parantheses"),

  stock: yup
    .number()
    .required("Stock value is required")
    .min(0, "Stock value must be greater than 0")
    .integer(),

  brand: yup
    .string()
    .required("Brand of the product is required")
    .matches("^[a-zA-Z()0-9 ]+$", "Can only contain alpha numeric characters and parantheses"),

  comment: yup
    .string()
    .required("Comment is required"),
});

const Form = ({initialValue, onSubmit, onReset, heading}) => {
    return (
        <FormContainer>
          <Heading style={({ marginBottom: 10 })}>{heading}</Heading>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            onReset={onReset}>
    
            {({ handleSubmit, handleReset }) => (
              <View>
                <InputField label="Name" type="text" name="name" />
                <InputField label="Stock" type="number" name="stock" />
                <InputField label="Brand" type="text" name="brand" />
                <InputField label="Comment" type="text" name="comment" />
    
                <FormActions>
                  <Pressable onPress={handleReset}>
                    <Text>Cancel</Text>
                  </Pressable>
                  <Pressable onPress={handleSubmit}>
                    <Text color={Theme.color.primary}>Save</Text>
                  </Pressable>
                </FormActions>
              </View>
    
            )}
          </Formik>
        </FormContainer>
      );
};

export default Form;