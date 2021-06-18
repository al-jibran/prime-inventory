import React from 'react';
import { View, FlatList } from 'react-native';

import { Text, Heading } from '../Text';
import { FieldStyle } from '../../styles/common';
import Form from './Form';

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
      <Form />
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