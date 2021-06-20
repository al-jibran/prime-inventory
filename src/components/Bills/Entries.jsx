import React from 'react';
import { FlatList, View } from 'react-native';

import { Text, Heading } from '../Text';
import { FieldStyle } from '../../styles/common';
import styled from 'styled-components/native';
import Button from '../Button';

const EntriesStyle = styled.View`
  margin-top: 15px;
  z-index: -1;
  flex-grow: 1
`;

const ListFooterComponent = () => {
  return <>
    <Button bgColor="white" text="Clear" rounded />
    <Button bgColor="success" text="Save" rounded/>
  </>;
};

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
  const hide = entries.length ? { display: 'flex' } : { display: 'none' };

  return (
    <EntriesStyle>
      <FlatList
        ListHeaderComponent={() => <Heading>Entries</Heading>}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => renderItem(item, index)}
        data={entries}
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponentStyle={({ flexShrink: 1 })}
        contentContainerStyle={({ flexGrow: 3 })}
        ListFooterComponentStyle={({ ...hide, justifyContent: 'space-between', flexShrink: 1, flexDirection: 'row' })}
        ListEmptyComponent={() => <View style={({ flex: 2, justifyContent: 'center', alignItems: 'center' })}><Text color="gray">There's nothing to show here</Text></View>}
      />

    </EntriesStyle>
  );
};

export default Entries;