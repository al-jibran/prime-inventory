/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable } from "react-native";
import { capitalize } from "lodash";
import styled from "styled-components/native";

import { Text } from "../../components/Text";
import { useSettings } from "../../hooks/useSettings";
import Theme from "../../theme";
import { useLayoutEffect } from "react";

const SettingItem = styled.Pressable`
  background-color: white;
  padding: 15px;
  border: 1px solid #eee;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Settings = ({ navigation }) => {
  const [, , getAllSettings] = useSettings();
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const initSettings = async () => {
      const settings = await getAllSettings();
      if (isMounted) setSettings(settings);
    };

    initSettings();
    return () => (isMounted = false);
  }, []);

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      data={settings}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <SettingItem
          onPress={() => {
            navigation.navigate("SettingPage", { name: item.toLowerCase() });
          }}
        >
          <Text fontWeight={Theme.fontWeight.bold}>{item}</Text>
        </SettingItem>
      )}
    />
  );
};

export const SettingPage = ({ navigation, route }) => {
  const [, operation] = useSettings(route.params.name);
  let [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const setting = await operation.getValue();
      setData(Object.entries(setting));
    });

    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddSettingButton navigation={navigation} />,
      headerRightContainerStyle: { paddingRight: 20 },
    });
  }, [navigation]);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => {
        const key = item[0];
        const value = item[1];

        return (
          <SettingItem
            onLongPress={() =>
              Alert.alert(`Delete ${key}?`, "", [
                { text: "Cancel" },
                { text: "Yes", onPress: () => null },
              ])
            }
            onPress={() =>
              navigation.navigate("DisplayModal", {
                action: "EditSetting",
                name: route.params.name,
                property: { key, value },
              })
            }
          >
            <Text>{capitalize(key)}</Text>
            <Text>{value}</Text>
          </SettingItem>
        );
      }}
    />
  );
};

const AddSettingButton = ({ navigation }) => {
  const onPressAdd = () => {
    navigation.navigate("DisplayModal", { action: "AddSetting" });
  };

  return (
    <Pressable onPress={onPressAdd}>
      <Text>Add</Text>
    </Pressable>
  );
};
