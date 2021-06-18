import React, { useState } from 'react';
import { View, FlatList } from 'react-native';

import { Text, Heading } from '../Text';
import { FieldStyle } from '../../styles/common';
import Form from './Form';

const renderItem = (product, index) => {
  return (
    <FieldStyle layout="horizontal">
      <Text>{index + 1}</Text>
      <Text>{product.name}</Text>
      <Text>{product.change > 0 && '+'}{product.change}</Text>
    </FieldStyle>
  );
};

const AddEntry = () => {
  const [entries, setEntries] = useState([]);
  const hideList = entries.length ? {display: ''} : { display: 'none' };

  const onSaveEntry = ({ stock, product, id }, { resetForm }) => {
    setEntries(entries.concat({ productId: id, name: product, change: stock }));
    resetForm();
  };

  return (
    <View style={({ marginTop: 10 })}>
      <Heading>Add an entry</Heading>
      <Form onSubmit={onSaveEntry} />
      <FlatList
        ListHeaderComponent={() => <Heading>Entries</Heading>}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => renderItem(item, index)}
        data={entries}
        style={({...hideList, marginTop: 15, zIndex: -10000})} />
    </View>
  );
};

export default AddEntry;