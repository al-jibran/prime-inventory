import React from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components';
import * as yup from 'yup';

import { Heading, Text } from './Text';
import { Formik } from 'formik';
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
    .matches("^[a-zA-Z()0-9 ]+$", "Can only contain alpha numeric and parantheses"),

  stock: yup
    .number()
    .required("Stock value is required")
    .min(0, "Stock value must be greater than 0")
    .integer(),

  brand: yup
    .string()
    .required("Brand of the product is required")
    .matches("^[a-zA-Z()0-9 ]+$", "Can only contain alpha numeric and parantheses"),

  comment: yup
    .string()
    .required("Comment is required"),
});

const initialValue = {
  name: '',
  stock: '0',
  brand: '',
  comment: 'Initial stock',
};

const AddProduct = ({ setVisible, refreshData, data }) => {
  return (
    <FormContainer>
      <Heading style={({ marginBottom: 10 })}>Add an item</Heading>
      <Formik initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={({ name, stock, brand }) => {
          data.push({ product: name, brand, stock, id: (data.length + 1) });
          setVisible(false);
          refreshData(true);
        }}

        onReset={() => {
          setVisible(false);
        }}>

        {({ handleChange, handleBlur, handleSubmit, handleReset, errors, touched, values }) => (
          <View>
            <InputField type="text" label="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              error={errors.name}
              touched={touched.name} />

            <InputField type="number" label="Stock"
              onChangeText={handleChange('stock')}
              onBlur={handleBlur('stock')}
              value={values.stock}
              error={errors.stock}
              touched={touched.stock} />

            <InputField type="text" label="Brand"
              onChangeText={handleChange('brand')}
              onBlur={handleBlur('brand')}
              value={values.brand}
              error={errors.brand}
              touched={touched.brand} />

            <InputField type="text" label="Comment"
              onChangeText={handleChange('comment')}
              onBlur={handleBlur('comment')}
              value={values.comment}
              error={errors.comment}
              touched={touched.comment} />

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

export default AddProduct;