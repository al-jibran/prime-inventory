import React from 'react';
import { View, Alert, Pressable, StyleSheet } from 'react-native';
import { Heading } from './Text';
import { Formik } from 'formik';
import InputField from './InputField';
import Theme from '../theme';

const styles = StyleSheet.create({
  overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      flex: 1,
      justifyContent: 'flex-end',
      paddingLeft: 30,
      paddingRight: 30
  }
});

const initialValue = {
  name: '',
  stock: '0',
  brand: '',
  comment: 'Initial stock',
};

const AddProduct = () => {
  return (
    <View style={styles.overlay}>
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

            <Pressable onPress={handleSubmit} title="Submit" />
          </View>

        )}
      </Formik>
    </View>
  );
};

export default AddProduct;