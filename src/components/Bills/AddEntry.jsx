import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';

import { View } from 'react-native';
import { Text, Heading } from '../Text';
import { TextInput, NumberInput } from '../InputField';
import { FieldStyle } from '../../styles/common';

const initialValues = {
  comment: "",
  stock: "0",
  query: "",
};

const FormContainer = styled.View`
  margin-top: 20px;
`;

const AddEntry = () => {
  return (
    <FormContainer>
      <Heading>Add an entry</Heading>
      <Formik initialValues={initialValues}>
        <View>
          <FieldStyle>
            <Text>Comment</Text>
            <TextInput name="comment" />
          </FieldStyle>
          <FieldStyle layout="horizontal">
            <Text>Quantity</Text>
            <NumberInput name="stock" />
          </FieldStyle>
        </View>
      </Formik>
    </FormContainer>
  );
};

export default AddEntry;