import React from 'react';
import { FlatList, View } from 'react-native';

import { Text, Heading } from '../Text';
import { FieldStyle } from '../../styles/common';


const renderItem = (product, index) => {
  return (
    <FieldStyle layout="horizontal">
      <Text>{index + 1}</Text>
      <Text>{product.name}</Text>
      <Text>{product.stock > 0 && '+'}{product.stock}</Text>
    </FieldStyle>
  );
};

const Entries = ({ entries }) => {
  return (
    <View style={({ marginTop: 15, zIndex: -1 })} >
      <FlatList
        ListHeaderComponent={() => <Heading>Entries</Heading>}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => renderItem(item, index)}
        data={entries}
        />
    </View>
  );
};

export default Entries;