import React, { useState } from 'react';
import { View } from 'react-native';

import { Text } from '../components/Text';
import { Container } from '../styles/common';
import Toolbar from '../components/Toolbar';
import AddEntry from '../components/Bills/AddEntry';
import Entries from '../components/Bills/Entries';

const Bills = () => {
  const [entries, setEntries] = useState([]);

  return (
    <Container padLeft={20} padRight={20}>
      <Toolbar items={ToolbarItems} justifyItems="center" />
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