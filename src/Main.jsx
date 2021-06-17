import React from 'react';
import Inventory from './screens/Inventory';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddProduct from './components/AddProduct';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inventory') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Bills') {
            iconName = `ios-list`;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

      })} initialRouteName="Bills">
        <Tab.Screen name="Bills" component={AddProduct} />
        <Tab.Screen name="Inventory" component={Inventory} />
      </Tab.Navigator>
    </NavigationContainer>

  );
};

export default Main;