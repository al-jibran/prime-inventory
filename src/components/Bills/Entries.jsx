import React from 'react';
import { FlatList, Pressable, View, Alert } from 'react-native';

import { Text, Heading } from '../Text';
import { FieldStyle } from '../../styles/common';
import styled from 'styled-components/native';
import Button from '../Button';
import { useStore } from '../../contexts/StoreContext';
import { editProduct } from '../../productReducer';

const EntriesStyle = styled.View`
  margin-top: 15px;
  z-index: -1;
  flex-grow: 1
`;

const ListFooterComponent = ({ onPressedClear, onPressedSave }) => {
  return <>
    <Button bgColor="white" text="Clear" rounded onPress={onPressedClear} />
    <Button bgColor="success" text="Save" rounded onPress={onPressedSave} />
  </>;
};

const ListEmptyComponent = () => {
  return (
    <View style={({ flex: 1, justifyContent: 'center', alignItems: 'center' })}>
      <Text color="gray" align="center">There are no entries here.</Text>
      <Text color="gray">Add some by filling up the form.</Text>
    </View>
  );
};


const renderItem = (product, index, deleteEntry) => {
  return (
    <Pressable style={({ borderBottomWidth: 1, borderColor: "#eee" })} onLongPress={() => deleteEntry(product.id)}>
      <FieldStyle layout="horizontal" >
        <Text>{index + 1}</Text>
        <Text>{product.name}</Text>
        <Text>{product.stock > 0 && '+'}{product.stock}</Text>
      </FieldStyle>
    </Pressable>
  );
};

const Entries = ({ entries, setEntries }) => {
  const [, useDispatch] = useStore();
  const hide = entries.length ? { display: 'flex' } : { display: 'none' };

  const onClearEntries = () => {
    Alert.alert("Clear entries?",
      `Are you sure you want to delete ${entries.length} ${entries.length > 1 ? `items` : `item`}?`,
      [{ text: "Cancel", onPress: null }, { text: "Yes", onPress: () => setEntries([]) }]);
  };

  const onSaveEntries = () => {
    Alert.alert("Save entries?",
      `Are you sure want to save these entries?`,
      [{ text: "Cancel", onPress: null },
      {
        text: "Yes", onPress: () => {
          entries.forEach(({ id, stock }) => useDispatch(editProduct(id, { stock })));
        }
      }]);
  };

  const onDeleteEntry = (id) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    setEntries(newEntries);
  };

  return (
    <EntriesStyle>
      <FlatList
        ListHeaderComponent={() => <Heading>Entries</Heading>}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => renderItem(item, index, onDeleteEntry)}
        data={entries}
        ListFooterComponent={() =>
          <ListFooterComponent
            onPressedClear={onClearEntries}
            onPressedSave={onSaveEntries}
          />}
        ListHeaderComponentStyle={({ flexShrink: 1 })}
        contentContainerStyle={({ flexGrow: 3 })}
        ListFooterComponentStyle={({ ...hide, justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 })}
        ListEmptyComponent={ListEmptyComponent}
      />

    </EntriesStyle>
  );
};

export default Entries;