import React from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants';
import Inventory from './screens/Inventory';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddProduct from './components/AddProduct';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inventory" component={Inventory} />
        <Tab.Screen name="Bills" component={AddProduct}/>
      </Tab.Navigator>
    </NavigationContainer>

  );
};

export default Main;