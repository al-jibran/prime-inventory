import React, { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { useMutation } from "@apollo/client";

import { Heading } from "../../components/Text";
import { Container, FieldStyle } from "../../styles/common";
import AddEntry from "./AddEntry";
import Entries from "./Entries";
import { BULK_UPDATE_PRODUCTS } from "../../graphql/queries";

const Bills = () => {
  const [bulkUpdateProducts] = useMutation(BULK_UPDATE_PRODUCTS, {
    onCompleted: () => {
      Alert.alert(
        "Bill was successfully created and the values have been changed!"
      );
      setEntries([]);
    },
    onError: (error) => {
      Alert.alert("There was a problem creating the bill.", error.message);
    },
  });

  const [entries, setEntries] = useState([]);
  const [comment, setComment] = useState("");

  const onChangeText = (text) => {
    setComment(text);
  };

  const submitEntries = () => {
    if (!comment) {
      Alert.alert("Empty Comment", "Cannot submit without a comment");
      return;
    }
    bulkUpdateProducts({ variables: { bill: { comment, entries } } });
  };

  return (
    <View style={{ flex: 1 }}>
      <Container>
        <FieldStyle>
          <Heading>Comment</Heading>
          <TextInput
            multiline={true}
            value={comment}
            onChangeText={onChangeText}
            style={{ borderBottomWidth: 1 }}
          />
        </FieldStyle>
        <AddEntry entries={entries} setEntries={setEntries} />
      </Container>
      <View style={{ zIndex: -100, flex: 1 }}>
        <Heading mLeftRight={20}>Entries</Heading>
        <Entries
          entries={entries}
          setEntries={setEntries}
          submitEntries={submitEntries}
        />
      </View>
    </View>
  );
};

export default Bills;
