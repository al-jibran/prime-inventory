import React from 'react';
import { View, Alert, TextInput, Pressable } from 'react-native';
import { Heading } from './Text';
import { Formik } from 'formik';
import { Text } from './Text';

const initialValue = {
  name: '',
  stock: '',
  brand: '',
  comment: 'Initial stock',
};

const AddProduct = () => {
  return (
    <View>
      <Heading>Add a form</Heading>
      <Formik initialValues={initialValue} onSubmit={(values) => {
        Alert.alert("Hello", JSON.stringify(values));
      }}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text>Name</Text>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Name of the product"
            />
            <Text>Stock</Text>
            <TextInput
              onChangeText={handleChange('stock')}
              onBlur={handleBlur('stock')}
              value={values.stock}
              placeholder="Stock value"
              keyboardType="numeric"
            />
            <Pressable onPress={handleSubmit} title="Submit" />
          </View>

        )}
      </Formik>
    </View>
  );
};

export default AddProduct;