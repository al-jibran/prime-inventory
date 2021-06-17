import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';

import { View } from 'react-native';
import { Text, Heading } from '../Text';
import { TextInput, NumberInput } from '../InputField';
import { FieldStyle, SearchInput } from '../../styles/common';

const initialValues = {
  comment: "",
  stock: "0",
  query: "",
};

const LocalContainer = styled.View`
  margin-top: 20px;
`;

const AddEntry = () => {
  return (
    <View>
      <LocalContainer>
        <Heading>Add an entry</Heading>
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
          </View>
        </Formik>
      </LocalContainer>
      <LocalContainer>
        <Heading>Entries</Heading>
        <View style={({marginTop: 10})}>
          <FieldStyle layout="horizontal">
            <Text>1.</Text>
            <Text>Wheat</Text>
            <Text>+15</Text>
          </FieldStyle>
          <FieldStyle layout="horizontal">
            <Text>2.</Text>
            <Text>Rice</Text>
            <Text>-5</Text>
          </FieldStyle>
          <FieldStyle layout="horizontal">
            <Text>3.</Text>
            <Text>Pickle</Text>
            <Text>+25</Text>
          </FieldStyle>
        </View>
      </LocalContainer>
    </View>
  );
};

export default AddEntry;