/* eslint-disable react/display-name */
import React, { useEffect } from "react";
import { Platform } from "react-native";
import Inventory from "./screens/Inventory";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { capitalize } from "lodash";
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
import { Settings } from "./screens/Settings";
import EditSettingModal from "./screens/Settings/EditSettingModal";
import AddSettingModal from "./screens/Settings/AddSettingModal";

export const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Inventory";
  console.log(getFocusedRouteNameFromRoute(route));

  return routeName;
};

const InventoryStack = createStackNavigator();
const InventoryStackScreen = () => {
  return (
    <InventoryStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <InventoryStack.Screen name="Inventory" component={Inventory} />
    </InventoryStack.Navigator>
  );
};

const BillsStack = createStackNavigator();
const BillsStackScreen = () => {
  return (
    <BillsStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <BillsStack.Screen name="Bills" component={Bills} />
    </BillsStack.Navigator>
  );
};

const HistoryStack = createStackNavigator();
const HistoryStackScreen = () => {
  return (
    <HistoryStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <HistoryStack.Screen name="History" component={History} />
    </HistoryStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "white" } }}
    >
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
};
const Tab = createBottomTabNavigator();
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
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      initialRouteName="Settings"
    >
      <Tab.Screen
        name="Inventory"
        component={InventoryStackScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name="Bills" component={BillsStackScreen} />
      <Tab.Screen name="History" component={HistoryStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
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

const RootStack = createStackNavigator();
const Main = () => {
  const [, unitConig, allKeys] = useSettings("units");
  const [, rangeConfig] = useSettings("color-range");
  const [, undefConfig] = useSettings("undefined");

  useEffect(() => {
    const initSettings = async () => {
      const keys = await allKeys();
      if (keys.length === 0 || !keys.includes("Units")) {
        console.log("Adding units to the device...");
        await unitConig.setValue({ pcs: 1, box: 20, peti: 10 });
      }
      if (keys.length === 0 || !keys.includes("Color-range")) {
        console.log("Adding color range to the device...");
        await rangeConfig.setValue({ low: 10, warning: 20 });
      }
      console.log("Settings in storage 2", keys);
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
          name="DisplayModal"
          component={DisplayModal}
          options={modalOptions}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const DisplayModal = ({ route }) => {
  const RenderView = () => {
    const routeName = route.params.screen;
    if (routeName === "AddProduct") {
      return <AddProduct />;
    } else if (routeName === "EditProduct") {
      return <EditProduct id={route.params.id} />;
    } else if (routeName === "FilterProducts") {
      return null;
    } else if (routeName === "AddSetting") {
      return (
        <AddSettingModal
          typeOfValues={route.params.typeOfValues}
          settingName={route.params.settingName}
        />
      );
    } else if (routeName === "EditSetting") {
      return (
        <EditSettingModal
          name={route.params.name}
          property={route.params.property}
        />
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : null}
      style={styles.overlay}
    >
      <RenderView />
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
