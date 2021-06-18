import React from 'react';
import { Formik } from 'formik';
import { View, Text } from 'react-native';

import { TextInput, NumberInput } from '../InputField';
import { FieldStyle, SearchInput, FormActions } from '../../styles/common';
import Button from '../Button';

const initialValues = {
  comment: "",
  stock: "0",
  query: "",
};

const Form = () => {
  return (
    <View>
      <Formik initialValues={initialValues}>
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
            <SearchInput name="query" placeholder="Enter Product" />
          </FieldStyle>
          <FormActions>
            <Button bgColor="white" text={"Clear"} onPress={null} rounded />
            <Button bgColor="success" text={"Save"} onPress={null} rounded />
          </FormActions>
        </View>
      </Formik>
    </View>
  );
};

export default Form;