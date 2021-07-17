import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { useMutation } from "@apollo/client";

import { Text, Heading } from "../components/Text";
import { Container, FieldStyle } from "../styles/common";
import Toolbar from "../components/Toolbar";
import AddEntry from "../components/Bills/AddEntry";
import Entries from "../components/Bills/Entries";
import { BULK_UPDATE_PRODUCTS } from "../graphql/queries";

const Bills = () => {
  const [bulkUpdateProducts] = useMutation(BULK_UPDATE_PRODUCTS, {
    onError: (error) => {
      console.log(error.message);
    },
  });

  const [entries, setEntries] = useState([]);
  const [comment, setComment] = useState("");

  const onChangeText = (text) => {
    setComment(text);
  };

  const submitEntries = () => {
    bulkUpdateProducts({ variables: { bill: { comment, entries } } });
  };

  return (
    <Container padLeft={20} padRight={20}>
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
      <Entries
        entries={entries}
        setEntries={setEntries}
        submitEntries={submitEntries}
      />
    </Container>
  );
};

export default Bills;
