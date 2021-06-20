import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import { Text, Heading } from '../components/Text';
import { Container, FieldStyle } from '../styles/common';
import Toolbar from '../components/Toolbar';
import AddEntry from '../components/Bills/AddEntry';
import Entries from '../components/Bills/Entries';

const Bills = () => {
  const [entries, setEntries] = useState([]);
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    setValue(text);
  };

  return (
    <Container padLeft={20} padRight={20}>
      <Toolbar items={ToolbarItems} justifyItems="center" />
      <FieldStyle>
        <Heading>Comment</Heading>
        <TextInput multiline={true} value={value} onChangeText={onChangeText} style={({borderBottomWidth: 1})}/>
      </FieldStyle>
      <AddEntry entries={entries} setEntries={setEntries} />
      <Entries entries={entries} />
    </Container>
  );
};

const ToolbarItems = () => {
  return (
    <View>
      <Text>Bills</Text>
    </View>
  );
};

export default Bills;