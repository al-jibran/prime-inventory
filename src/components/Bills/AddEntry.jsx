import React, { useState } from 'react';
import { View, FlatList } from 'react-native';

import { Text, Heading } from '../Text';
import { FieldStyle } from '../../styles/common';
import Form from './Form';
import { useDropDown } from '../../hooks/useDropDown';

const renderItem = (product, index) => {
  return (
    <FieldStyle layout="horizontal">
      <Text>{index + 1}</Text>
      <Text>{product.name}</Text>
      <Text>{product.stock > 0 && '+'}{product.stock}</Text>
    </FieldStyle>
  );
};

const AddEntry = () => {
  const [entries, setEntries] = useState([]);
  const { getValueForItem } = useDropDown('units');

  const hideList = entries.length ? {display: ''} : { display: 'none' };

  const onSaveEntry = ({ stock, name, id, unit }, { resetForm }) => {
    const changeBy = getValueForItem(unit);
    stock *= changeBy;

    setEntries(entries.concat({ id, name, stock }));
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