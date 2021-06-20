import React from 'react';
import { FlatList } from 'react-native';

import { Text, Heading } from '../Text';
import { FieldStyle } from '../../styles/common';
import styled from 'styled-components/native';

const EntriesStyle = styled.View`
  margin-top: 15px;
  z-index: -1;
  flex-grow: 1
`;

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
    <EntriesStyle>
      <FlatList
        ListHeaderComponent={() => <Heading>Entries</Heading>}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => renderItem(item, index)}
        data={entries}
        />
    </EntriesStyle>
  );
};

export default Entries;