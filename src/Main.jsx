import React, { useEffect } from 'react';
import Inventory from './screens/Inventory';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bills from './screens/Bills';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSettings } from './hooks/useSettings';

const Tab = createBottomTabNavigator();

const Main = () => {
  const [, operations, allSettings] = useSettings('units');

  useEffect(() => {
    const initSettings = async () => {
      if ((await allSettings()).length) {
        console.log("Should not be in production. Removing values if there are any before, only for development.");
        await operations.removeValue();
      }
      console.log("Adding values to the application...");
      await operations.setValue({pcs: 1, box: 20, peti: 10});

      const keys = await allSettings();
      console.log("Keys:", keys);
    };
    initSettings();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={({ backgroundColor: 'white' })}
        screenOptions={({ route }) => ({
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
        <Tab.Screen name="Bills" component={Bills} />
        <Tab.Screen name="Inventory" component={Inventory} />
      </Tab.Navigator>
    </NavigationContainer>

  );
};

export default Main;