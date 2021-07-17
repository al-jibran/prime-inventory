/* eslint-disable react/display-name */
import React, { useEffect } from "react";
import Inventory from "./screens/Inventory";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Bills from "./screens/Bills";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSettings } from "./hooks/useSettings";
import Product from "./screens/Product";

export const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Inventory";

  return routeName;
};

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const InventoryStack = createStackNavigator();
const BillsStack = createStackNavigator();

const InventoryStackScreen = () => {
  return (
    <InventoryStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <InventoryStack.Screen name="Inventory" component={Inventory} />
    </InventoryStack.Navigator>
  );
};

const BillsStackScreen = () => {
  return (
    <BillsStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <BillsStack.Screen name="Bills" component={Bills} />
    </BillsStack.Navigator>
  );
};

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Inventory") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Bills") {
            iconName = `ios-list`;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      initialRouteName="Inventory"
    >
      <Tab.Screen name="Bills" component={BillsStackScreen} />
      <Tab.Screen
        name="Inventory"
        component={InventoryStackScreen}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

const Main = () => {
  const [units, operations, allKeys] = useSettings("units");

  useEffect(() => {
    const initSettings = async () => {
      if ((await allKeys()).length) {
        console.log("Removing ", units);
        await operations.removeValue();
      }

      await operations.setValue({ pcs: 1, box: 20, peti: 10 });
      const key = await allKeys();
      console.log(key);
    };
    initSettings();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{ cardStyle: { backgroundColor: "white" } }}
      >
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Product" component={Product} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
