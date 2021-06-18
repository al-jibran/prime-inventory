import React from 'react';
import { Formik } from 'formik';
import { View, Text } from 'react-native';

import { TextInput, NumberInput } from '../InputField';
import { FieldStyle, SearchInput, FormActions } from '../../styles/common';
import Button from '../Button';

const initialValues = {
  comment: "",
  stock: "0",
  product: {
    name: "Product 1",
    stock: "5",
    brand: "Brand A",
  },
};

const Form = ({ onSubmit }) => {
  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit, handleReset }) =>
          <View style={({ marginTop: 10 })}>
            <FieldStyle>
              <Text>Comment</Text>
              <TextInput name="comment" multiline={true} />
            </FieldStyle>
            <FieldStyle layout="horizontal">
              <Text>Quantity</Text>
              <NumberInput name="stock" />
            </FieldStyle>
            <FieldStyle>
              {/* SearchInput should return a product object */}
              <SearchInput name="product" placeholder="Enter Product" />
            </FieldStyle>
            <FormActions>
              <Button bgColor="white" text={"Clear"} onPress={handleReset} rounded />
              <Button bgColor="success" text={"Save"} onPress={(item) => handleSubmit(item, handleReset)} rounded />
            </FormActions>
          </View>
        }
      </Formik>
    </View>
  );
};

export default Form;