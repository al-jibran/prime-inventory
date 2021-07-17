import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Text } from "./components/Text";
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
import Toolbar from "./components/Toolbar";

const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Inventory";

  return routeName;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
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
      <Tab.Screen name="Bills" component={Bills} options={{ title: "Bills" }} />
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

const Main = () => {
  const [units, operations, allKeys] = useSettings("units");
  const [visible, setVisiblity] = useState(false);

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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ route }) => ({
            headerTitle: getRouteName(route),
          })}
        />
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ToolbarItems = ({ visible, toggleModal }) => {
  const onPressAdd = () => {
    toggleModal(!visible);
  };

  return (
    <>
      <Text>Filter</Text>
      <Text>Inventory</Text>
      <Pressable onPress={onPressAdd}>
        <Text>Add</Text>
      </Pressable>
    </>
  );
};

export default Main;
