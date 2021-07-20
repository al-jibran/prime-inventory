/* eslint-disable react/display-name */
import React, { useEffect } from "react";
import Inventory from "./screens/Inventory";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Bills from "./screens/Bills";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSettings } from "./hooks/useSettings";
import Product from "./screens/Product";
import AddProduct from "./components/Inventory/AddProduct";
import EditProduct from "./components/Inventory/EditProduct";
import History from "./screens/History";

export const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Inventory";

  return routeName;
};

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const InventoryStack = createStackNavigator();
const BillsStack = createStackNavigator();
const HistoryStack = createStackNavigator();

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

const HistoryStackScreen = () => {
  return (
    <HistoryStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <HistoryStack.Screen name="History" component={History} />
    </HistoryStack.Navigator>
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
            iconName = focused ? `document-text` : `document-text-outline`;
          } else if (route.name === "History") {
            iconName = focused ? "time" : `time-outline`;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      initialRouteName="Inventory"
    >
      <Tab.Screen
        name="Inventory"
        component={InventoryStackScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name="Bills" component={BillsStackScreen} />
      <Tab.Screen name="History" component={HistoryStackScreen} />
    </Tab.Navigator>
  );
};

const modalOptions = {
  cardStyle: { backgroundColor: "transparent" },
  headerShown: false,
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: "clamp",
      }),
    },
  }),
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
        mode="modal"
        initialRouteName="Home"
        screenOptions={{ cardStyle: { backgroundColor: "white" } }}
      >
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Product" component={Product} />
        <RootStack.Screen
          name="AddProduct"
          component={AddProductModal}
          options={modalOptions}
        />
        <RootStack.Screen
          name="EditProduct"
          component={EditProductModal}
          options={modalOptions}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const AddProductModal = () => {
  return (
    <KeyboardAvoidingView behavior="position" style={styles.overlay}>
      <AddProduct />
    </KeyboardAvoidingView>
  );
};

const EditProductModal = ({ route }) => {
  return (
    <KeyboardAvoidingView behavior="position" style={styles.overlay}>
      <EditProduct id={route.params.id} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Main;
