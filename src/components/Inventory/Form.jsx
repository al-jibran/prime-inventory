import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';


import { Heading, Text } from '../Text';
import { TextInput, NumberInput, DropDownInput } from '../InputField';
import Theme from '../../theme';
import { FieldStyle, FormActions } from '../../styles/common';
import { useSettings } from '../../hooks/useSettings';


const FormContainer = styled.View`
  background-color: white;
  padding: 25px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;  
  border-top-color: ${Theme.color.primary}; 
  border: 2px solid;
`;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name of the product is required")
    .matches("^[a-zA-Z()0-9\\- ]+$", "Can only contain alpha numeric characters and parantheses"),

  stock: yup
    .string()
    .required("Stock value is required")
    .matches("^[0-9\\-]+$", "Enter valid numbers")
    .default(0),

  brand: yup
    .string()
    .required("Brand of the product is required")
    .matches("^[a-zA-Z()0-9\\- ]+$", "Can only contain alpha numeric characters and parantheses"),

  comment: yup
    .string()
    .required("Comment is required"),
});

const FormHandler = ({ initialValue, onSubmit, onReset, heading }) => {
  return (
    <FormContainer>
      <Heading style={({ marginBottom: 10 })}>{heading}</Heading>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        onReset={onReset}>

        {({ handleSubmit, handleReset }) =>
          <FormView
            handleReset={handleReset}
            handleSubmit={handleSubmit} />}

      </Formik>
    </FormContainer>
  );
};

const FormView = ({ handleReset, handleSubmit }) => {
  return (
    <View>
      <FieldStyle layout="horizontal">
        <Text>Name</Text>
        <TextInput name="name" autoCapitalize="words" width="50%"/>
      </FieldStyle>

      <FieldStyle layout="horizontal">
        <Text>Stock</Text>
        <View style={({ flexDirection: 'row', justifyContent: 'flex-end' })}>
          <NumberInput name="stock"/>
          <DropDownInput name="unit" items={[{ label: 'pcs', value: 'pcs'}]} z-index={29999}/>
        </View>
      </FieldStyle>

      <FieldStyle layout="horizontal">
        <Text>Brand</Text>
        <TextInput name="brand" autoCapitalize="words" width="50%"/>
      </FieldStyle>

      <FieldStyle layout="horizontal">
        <Text>Comment</Text>
        <TextInput name="comment" width="50%"/>
      </FieldStyle>

      <FormActions width="30">
        <Pressable onPress={handleReset}>
          <Text>Cancel</Text>
        </Pressable>
        <Pressable onPress={handleSubmit}>
          <Text color={Theme.color.primary}>Save</Text>
        </Pressable>
      </FormActions>

    </View>
  );
};

export default FormHandler;