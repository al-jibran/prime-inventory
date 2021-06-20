import React, { useState } from 'react';
import { View } from 'react-native';

import { Text, Heading } from '../components/Text';
import { Container, FieldStyle } from '../styles/common';
import Toolbar from '../components/Toolbar';
import AddEntry from '../components/Bills/AddEntry';
import Entries from '../components/Bills/Entries';
import { TextInput } from '../components/InputField';

const Bills = () => {
  const [entries, setEntries] = useState([]);

  return (
    <Container padLeft={20} padRight={20}>
      <Toolbar items={ToolbarItems} justifyItems="center" />
      <FieldStyle>
        <Heading>Comment</Heading>
        <TextInput multiline={true}/>
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