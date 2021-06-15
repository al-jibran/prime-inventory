import React from 'react';
import { View, Alert, Pressable } from 'react-native';
import { Heading, Text } from './Text';
import { Formik } from 'formik';
import InputField from './InputField';
import Theme from '../theme';
import styled from 'styled-components';

const FormContainer = styled.View`
  background-color: white;
  padding-top: 12px;
  padding-left: 30px;
  padding-right: 30px;
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
  margin-bottom: 40px;
  margin-top: 10px;
`;

const initialValue = {
  name: '',
  stock: '0',
  brand: '',
  comment: 'Initial stock',
};

const AddProduct = () => {
  return (
    <FormContainer>
      <Heading>Add an item</Heading>
      <Formik initialValues={initialValue} onSubmit={(values) => {
        Alert.alert("Hello", JSON.stringify(values));
      }}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <InputField type="text" label="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name} />

            <InputField type="number" label="Stock"
              onChangeText={handleChange('stock')}
              onBlur={handleBlur('stock')}
              value={values.stock} />

            <InputField type="text" label="Brand"
              onChangeText={handleChange('brand')}
              onBlur={handleBlur('brand')}
              value={values.brand} />

            <InputField type="text" label="Comment"
              onChangeText={handleChange('comment')}
              onBlur={handleBlur('comment')}
              value={values.comment} />

            <FormActions>
              <Pressable onPress={handleSubmit}>
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