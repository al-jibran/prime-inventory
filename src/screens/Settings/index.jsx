import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Alert, FlatList } from "react-native";
import { capitalize } from "lodash";
import styled from "styled-components/native";

import { Text } from "../../components/Text";
import { useSettings } from "../../hooks/useSettings";
import { Container, FieldStyle } from "../../styles/common";
import { TextInput } from "../../components/InputField";
import Theme from "../../theme";

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

export const SettingPage = ({ route }) => {
  const [setting, operation] = useSettings(route.params.name);
  const data = setting && Object.entries(setting);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => {
        const key = capitalize(item[0]);
        const value = capitalize(item[1]);

        return (
          <SettingItem
            onLongPress={() =>
              Alert.alert(`Delete ${key}?`, "", [
                { text: "Cancel" },
                { text: "Yes", onPress: null },
              ])
            }
          >
            <Text>{key}</Text>
            <Text>{value}</Text>
          </SettingItem>
        );
      }}
    />
  );
};
