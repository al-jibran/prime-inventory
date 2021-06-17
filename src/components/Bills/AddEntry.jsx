import React from 'react';
import { Formik } from 'formik';

import { View } from 'react-native';
import { Text, Heading } from '../Text';
import { TextInput } from '../InputField';

const initialValues = {
  comment: "",
  stock: "0",
  query: "",
};

const AddEntry = () => {
  return (
    <View>
      <Heading>Add an entry</Heading>
      <Formik initialValues={initialValues}>
        <View>
          <Text>Comment</Text>
          <TextInput name={"comment"} />
        </View>
      </Formik>
    </View>
  );
};

export default AddEntry;