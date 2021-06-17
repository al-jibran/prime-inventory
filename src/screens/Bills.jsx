import React from 'react';
import {Text} from '../components/Text';
import { View } from 'react-native';
import { Container } from '../styles/common';
import Toolbar from '../components/Toolbar';

const Bills = () => {
  return (
    <Container padLeft={20} padRight={20}>
      <Toolbar items={ToolbarItems} justifyItems="center"/>
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