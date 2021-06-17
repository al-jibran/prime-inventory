import React from 'react';
import { View } from 'react-native';

import {Text} from '../components/Text';
import { Container } from '../styles/common';
import Toolbar from '../components/Toolbar';
import AddEntry from '../components/Bills/AddEntry';

const Bills = () => {
  return (
    <Container padLeft={20} padRight={20}>
      <Toolbar items={ToolbarItems} justifyItems="center"/>
      <AddEntry />
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