import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { capitalize } from 'lodash';


import { Heading, Text } from '../Text';
import { TextInput, NumberInput, DropDownInput } from '../InputField';
import Theme from '../../theme';
import UnitStorageContext from '../../contexts/UnitStorageContext';
import { FieldStyle } from '../../styles/common';


const FormContainer = styled.View`
  background-color: white;
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
  const [items, setItems] = useState([]);
  const unitStorage = useContext(UnitStorageContext);

  useEffect(() => {
    unitStorage.getAllKeys().then(keys => {

      const unitItems = keys.map((key) => {
        const unit = key.split(':')[1];
        return ({label: capitalize(unit), value: unit});
      });
      
      setItems(unitItems);
    }).catch(error => {
      console.log(error);
    });
  }, []);

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
          <DropDownInput name="unit" items={items} setItems={setItems} z-index={29999}/>
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

      <FormActions>
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