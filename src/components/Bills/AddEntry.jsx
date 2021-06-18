import React from 'react';
import { Formik } from 'formik';
import { View, FlatList } from 'react-native';

import { Text, Heading } from '../Text';
import { TextInput, NumberInput } from '../InputField';
import { FieldStyle, SearchInput } from '../../styles/common';
import Button from '../Button';

const initialValues = {
  comment: "",
  stock: "0",
  query: "",
};

const entries = [{
  name: "Wheat",
  change: "15",
},
{
  name: "Rice",
  change: "-5",
},
{
  name: "Pickle",
  change: "25",
}];

const renderItem = (item, index) => {
  return (
    <FieldStyle layout="horizontal">
      <Text>{index + 1}</Text>
      <Text>{item.name}</Text>
      <Text>{item.change}</Text>
    </FieldStyle>
  );
};

const AddEntry = () => {
  return (
    <View style={({ marginTop: 10 })}>
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
          <FieldStyle>
            <Button bgColor="white" text={"Cancel"} onPress={null} rounded />
            <Button bgColor="primary" text={"Save"} onPress={null} rounded />
          </FieldStyle>
        </View>
      </Formik>
      <FlatList
        ListHeaderComponent={() => <Heading>Entries</Heading>}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => renderItem(item, index)}
        data={entries}
        style={({ marginTop: 15 })} />
    </View>
  );
};

export default AddEntry;