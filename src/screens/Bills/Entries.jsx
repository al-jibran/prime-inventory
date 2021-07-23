import React from "react";
import { FlatList, Pressable, Alert } from "react-native";

import { Text, AdaptiveText } from "../../components/Text";
import { FieldStyle } from "../../styles/common";
import Button from "../../components/Button";
import ListEmptyComponent from "../../components/ListEmptyComponent";

const ListFooterComponent = ({ onPressedClear, onPressedSave }) => {
  return (
    <>
      <Button bgColor="white" text="Clear" rounded onPress={onPressedClear} />
      <Button bgColor="success" text="Save" rounded onPress={onPressedSave} />
    </>
  );
};

const renderItem = (product, index, deleteEntry) => {
  return (
    <Pressable
      style={{ borderBottomWidth: 1, borderColor: "#eee" }}
      onLongPress={() => deleteEntry(product._id)}
    >
      <FieldStyle layout="horizontal">
        <Text>{index + 1}</Text>
        <Text>{product.name}</Text>
        <AdaptiveText>
          {product.stock > 0 && "+"}
          {product.stock}
        </AdaptiveText>
      </FieldStyle>
    </Pressable>
  );
};

const Entries = ({ entries, setEntries, submitEntries }) => {
  const hide = entries.length ? { display: "flex" } : { display: "none" };

  const onClearEntries = () => {
    Alert.alert(
      "Clear entries?",
      `Are you sure you want to delete ${entries.length} ${
        entries.length > 1 ? `items` : `item`
      }?`,
      [
        {
          text: "Cancel",
          onPress: null,
        },
        {
          text: "Yes",
          onPress: () => setEntries([]),
        },
      ]
    );
  };

  // INCOMPLETE: Comments should be sent from here
  const onSaveEntries = () => {
    Alert.alert("Save entries?", "Are you sure want to save these entries?", [
      {
        text: "Cancel",
        onPress: null,
      },
      {
        text: "Yes",
        onPress: () => {
          submitEntries();
        },
      },
    ]);
  };

  const onDeleteEntry = (id) => {
    const newEntries = entries.filter((entry) => entry._id !== id);
    setEntries(newEntries);
  };

  return (
    <FlatList
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => renderItem(item, index, onDeleteEntry)}
      data={entries}
      ListFooterComponent={() => (
        <ListFooterComponent
          onPressedClear={onClearEntries}
          onPressedSave={onSaveEntries}
        />
      )}
      contentContainerStyle={{ flexGrow: 1, marginRight: 25, marginLeft: 25 }}
      ListFooterComponentStyle={{
        ...hide,
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 15,
      }}
      ListEmptyComponent={
        <ListEmptyComponent
          text={[
            "There are no entries here.",
            "Add some by filling up the form above",
          ]}
        />
      }
    />
  );
};

export default Entries;
